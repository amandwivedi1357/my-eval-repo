import LoadingIndicator from "./LoadingIndicator";
import {useEffect,useState} from "react"
import CountriesCard from "./CountriesCard"
import Pagination from "./Pagination"


const getCountries = ({page=1})=>{
  return fetch("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries?limit=10&page="+ page ).then((res)=>res.json())
}
function Countries() { 
  const [isLoading,setLoading] = useState(false);
  const [data,setData] = useState([])
  const [page,SetPage] = useState(1);

  useEffect(()=>{
    handleGetCountries(page)
  },[page]);
  const handleGetCountries = (page)=>{
    setLoading(true);
    getCountries({page}).then((res)=>{
      setData(res);
      setLoading(false)
    })
    .catch((err)=>{
      console.log(err)
      setLoading(false)
    })
  }
  if(isLoading)
  {
    return <LoadingIndicator />
  }
  console.log(data)

  return (
    <div>
      <h1 data-testid="countries-header">Countries List</h1>
      <div data-testid="countries-container">
        {data?.data?.map((item)=>(
          <CountriesCard
          key={item.id}
          population={item.population}
          country={item.country}
          />
        ))}
      </div>
      <div>
        <Pagination 
        current={page}
        total={data.totalPages}
        onChange={(page)=>SetPage(page)}
      />
        </div>
    </div>
  );
}

export default Countries;
