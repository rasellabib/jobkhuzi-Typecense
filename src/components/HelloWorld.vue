<template>
  <div>
    <div class="container">
      <ais-instant-search :search-client="searchClient" index-name="JobsData">
        <ais-configure :hits-per-page.camel="32" />
        <div class="search-panel">
          <div class="search-panel__filters">
            <h4>Working Model</h4>
            <ais-refinement-list attribute="working_model" />

            <h4>Required Experience</h4>
            <ais-refinement-list attribute="required_experience" />

            <h4>Job Type</h4>
            <ais-refinement-list attribute="job_type" />

            <h4>Companies</h4>
            <ais-refinement-list attribute="company_name" />
            <h4>Location</h4>
            <ais-refinement-list attribute="location" />
          </div>
          <div class="search-panel__results">
            <div class="searchbox">
              <ais-search-box placeholder="" />
            </div>
            <ais-hits>
              <template v-slot:item="{ item }">
                <article>
                  <p class="job_title">
                    <ais-highlight :hit="item" attribute="job_title" class="job_title" />
                  </p>
                  <div class="hit-publication-year">
                    {{ item['working_model'] }}
                  </div>
                  <div class="hit-rating">{{ item['job_type'] }}</div>
                </article>
              </template>
            </ais-hits>

            <div class="pagination">
              <ais-pagination />
            </div>
          </div>
        </div>
      </ais-instant-search>
    </div>
  </div>
</template>

<script>
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter'

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: '761db557-3c4b-44ab-a223-7b870855bc8c',
    nodes: [
      {
        host: 'localhost',
        port: '8100',
        protocol: 'http'
      }
    ]
  },
  additionalSearchParameters: {
    queryBy: 'company_name,job_title'
  }
})
const searchClient = typesenseInstantsearchAdapter.searchClient

export default {
  data() {
    return {
      searchClient
    }
  }
}
</script>

<style>
body,
h1 {
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

em {
  background: cyan;
  font-style: normal;
}

.header {
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 0.5rem 1rem;
  background-image: linear-gradient(to right, #4dba87, #2f9088);
  color: #fff;
  margin-bottom: 1rem;
}

.header a {
  color: #fff;
  text-decoration: none;
}

.header-title {
  font-size: 1.2rem;
  font-weight: normal;
}

.header-title::after {
  content: ' ▸ ';
  padding: 0 0.5rem;
}

.header-subtitle {
  font-size: 1.2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.search-panel {
  display: flex;
}

.search-panel__filters {
  flex: 1;
}

.search-panel__results {
  flex: 3;
}

.ais-Highlight-highlighted {
  color: inherit;
  font-size: inherit;
}

.searchbox {
  margin-bottom: 2rem;
}

.pagination {
  margin: 2rem auto;
  text-align: center;
}

.job_title {
  font-size: 10px;
  font-weight: bold;
  margin: 0;
}

.hit-authors {
  margin-top: 3px;
  font-size: 0.8rem;
}

.hit-publication-year {
  font-size: 0.8rem;
  margin-top: 20px;
}

.hit-rating {
  margin-top: 3px;
  font-size: 0.8rem;
}

.ais-Hits-item {
  box-shadow: none;
  border: 1px solid lighten(lightgray, 8%);
}
</style>
