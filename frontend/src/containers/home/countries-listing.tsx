import { useQuery } from "@apollo/client";

import { GET_COUNTRIES } from "@/libs/api/public/countries/queries";
import Link from "next/link";

const HomeCountriesListing = () => {
  const { data, loading, error } = useQuery(GET_COUNTRIES);

  if (loading)
    return <span className="loading loading-spinner loading-md"></span>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
      {data.countries.map((country: any, index: number) => (
        <Link
          key={index}
          className="card bg-base-100 shadow-xl"
          href={`/${country.code}`}
        > 
          <figure>
            <h1 className="text-3xl py-4">{country.emoji}</h1>
          </figure>
          <div className="card-body">
            <h2 className="card-title">{country.name}</h2>
            {country.continent && (
              <p>
                <strong>Continent: </strong>
                {country.continent.name}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};
export default HomeCountriesListing;
