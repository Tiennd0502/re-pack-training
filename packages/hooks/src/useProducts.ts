import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { Product } from "@repo/types/product";
import { API_PATH } from "@repo/constants/api";
import { PAGE_SIZE } from "@repo/constants/common";
import { GET } from "@repo/services/api";

export const useProducts = () => {
  const useFetchProducts = (initPageParam: number) => {
    return useInfiniteQuery({
      queryKey: [API_PATH.PRODUCT],
      queryFn: ({ pageParam }) => {
        return GET<Product[]>(
          `${API_PATH.PRODUCT}?_page=${pageParam}&_limit=${PAGE_SIZE}`,
        );
      },
      initialPageParam: initPageParam,
      getNextPageParam: (lastPage, pages, page) => {
        return lastPage?.length === PAGE_SIZE ? page + 1 : undefined;
      },
    });
  };

  const useProductDetail = (id: string) =>
    useQuery({
      queryKey: [API_PATH.PRODUCT + id],
      queryFn: () => GET<Product>(`${API_PATH.PRODUCT}/${id}`),
      enabled: !!id,
    });

  return { useFetchProducts, useProductDetail };
};
