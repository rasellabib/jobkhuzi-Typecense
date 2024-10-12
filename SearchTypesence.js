import Typesense from "typesense"
import JobsData from "./data/JobsData.json" assert { type: "json" };
// const Typesense = import('typesense');

export default (async () => {
    const typesense = new Typesense.Client({
        nodes: [
            {
                host: 'localhost',
                port: '8100',
                protocol: 'http'
            }],
        apiKey: '761db557-3c4b-44ab-a223-7b870855bc8c',
        connectionTimeoutSeconds: 2
    });

    const schema = {
        name: 'JobsData',
        fields: [
            { "name": "company_name", "type": "string", facet: true },
            { "name": "job_title", "type": "string", facet: true },
            { "name": "working_model", "type": "string", facet: true },
            { "name": "job_type", "type": "string", facet: true },
            { "name": "required_experience", "type": "string", facet: true },
            { "name": "location", "type": "string", facet: true },
            { "name": "salary", "type": "string", facet: true },
            { "name": "apply_procedure", "type": "string" },
            { "name": "job_requirement", "type": "string", facet: true },
            { "name": "benefits", "type": "string" },
            { "name": "about_company", "type": "string", facet: true },
            { "name": "post_link", "type": "string" },
            { "name": "meta", "type": "auto" },
            { "name": "meta.document_created_at", "type": "string" },
            { "name": "meta.document_id", "type": "string" },
            { "name": "post_created_at", "type": "int64", facet: true },
            { "name": "job_responsibilities", "type": "string", facet: true },
        ],
        default_sorting_field: 'post_created_at',
    };


    console.log('Populating index in Typesense');

    try {
        await typesense.collections('JobsData').delete();
        console.log('Deleting existing collection: JobsData');
    } catch (error) {
        // Do nothing
    }

    console.log('Creating schema: ');
    console.log(JSON.stringify(schema, null, 2));
    await typesense.collections().create(schema);

    console.log('Adding records: ');

    try {
        const returnData = await typesense
            .collections('JobsData')
            .documents()
            .import(JobsData);
        console.log(returnData);
        console.log('Done indexing.');

        const failedItems = returnData.filter(item => item.success === false);
        if (failedItems.length > 0) {
            throw new Error(
                `Error indexing items ${JSON.stringify(failedItems, null, 2)}`
            );
        }

        return returnData;
    } catch (error) {
        console.log(error);
    }
})
    ();