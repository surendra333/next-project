import useSWR from "swr";

const fetcher = url => fetch(url).then(resp => resp.json())

 export const useGetHello = () => useSWR('/api/hello', fetcher);

export const useGetBlogs = ({ offset,filter},initialData) => useSWR(`/api/blogs?offset=${offset || 0}&date=${filter.date.asc ? 'asc':'desc'}`, fetcher,{initialData});
