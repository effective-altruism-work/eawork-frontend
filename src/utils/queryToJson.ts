export default function queryToJson(uiState: {
  query: string;
  disjunctiveFacetsRefinements: Map<string, string[]>;
  numericRefinements: { company_is_recommended_org: any };
}) {
  const queryString = uiState.query;
  const facetFilters: string[][] = [];

  // disjunctive facets
  const disjunctiveFacetsRaw: Map<string, string[]> = uiState.disjunctiveFacetsRefinements;
  for (const [facetName, facetValueArr] of Object.entries(disjunctiveFacetsRaw)) {
    if (!facetValueArr.length) {
      continue; // skip empties
    }

    const set = [];
    for (const facetValue of facetValueArr) {
      set.push(`${facetName}:${facetValue}`);
    }

    // by throwing these into sets of related facets (ex. subarray of tags_area, subarray of experience level),
    // we tell Algolia to look at these subarrays as OR options.
    facetFilters.push(set);
  }

  const isQuerySpecified = queryString || facetFilters.length;
  if (!isQuerySpecified) {
    return null;
  }
  
  return {
    query: queryString,
    facetFilters: facetFilters,
  };
}
