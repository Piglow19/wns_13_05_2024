import HomeCountriesListing from "@/containers/home/countries-listing";
import HomeCountryAddForm from "@/containers/home/country-add-form";

export default function Home() {
  return (
    <> 
      <HomeCountryAddForm />
      <HomeCountriesListing />
    </>
  );
}
