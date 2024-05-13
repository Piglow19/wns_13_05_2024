import { GET_COUNTRY } from '@/libs/api/public/countries/queries';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router'
 
export default function Page() {
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { code: router.query.countryID },
  });

  if (loading) return <span className="loading loading-spinner loading-md"></span>;
  if (error) return <p>Error: {error.message}</p>;
  
  return ( 
    <div className='text-center'>
      <p className='text-3xl'>{data.country.emoji}</p>
      <h1>{data.country.name}</h1>
      <p>{data.country.code}</p>
      {data.country.continent && <p>Continent: {data.country.continent.name}</p>}
    </div>
  )
}