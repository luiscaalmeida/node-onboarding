import {useQuery} from '@tanstack/react-query';

export const useFetch = (key, url) => {  
  const { isLoading, error, data } = useQuery({
    queryKey: [key],
    queryFn: () =>
      fetch(url).then(res =>
        res.json()
      )
  })

  return {isLoading, error, data}
};
