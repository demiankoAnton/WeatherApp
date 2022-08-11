export const convertCities = (cities = []) => {
  return cities.map(({ id, name, country }) => {
    return {
      id,
      name,
      label: `${name}, ${country}` }
  });
}
