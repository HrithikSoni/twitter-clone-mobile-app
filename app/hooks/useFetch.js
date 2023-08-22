import useAuth from "./useAuth";

export default function useFetch({ endpoint, onSuccess, onFail }) {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    request();
  }, [update]);

  function request(method) {
    axiosConfig.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axiosConfig
      .method(endpoint)
      .then((response) => {
        setData(response.data);
        onSuccess(response);
      })
      .catch((error) => {
        onFail(error);
      });

    setIsLoading(false);
  }

  function refresh() {
    setUpdate(!update);
  }

  return { data, isLoading, request, refresh };
}
