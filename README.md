# React + Vite

-this project is about making websites that communicate with apollo/server using apollo/client.
-apolloclient is state management library for javascript that enables to manage both local and remote data using graphQL 
-data is fetcheced using useQuery hook, changes to remote data are done using mutation.
-queries are created accordingly to get required data only
- data that are fetched is saved in cache (InMemoryCache)
-subscription needs to be used only when
1 small, incremental changes to objects
2 low latency real time update eg chat app

