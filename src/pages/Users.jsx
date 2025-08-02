import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import { fetchUsers } from "../queries/users";

const Users = () => {
  const rootRef = useRef(null);
  const elementRef = useRef(null);

  const [limit] = useState(20);

  // TanStack hook for loading infinite query
  const usersQuery = useInfiniteQuery({
    queryKey: ["users", { limit }],
    queryFn: fetchUsers,
    initialPageParam: 0,
    getNextPageParam: (lastpage, _allPages, lastPageParam) => {
      if (lastpage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  const { data, fetchNextPage, isFetching } = usersQuery;

  // intersection observer callback
  const observerCallback = useCallback((entries) => {
    if (entries[0].isIntersecting && !isFetching) {
      fetchNextPage();
    }
  }, [isFetching, fetchNextPage]);

  useEffect(() => {
    let observer;
    if (rootRef?.current) {
      const options = {
        root: rootRef.current,
        rootMargin: "0px",
        scrollMargin: "50px",
        threshold: 1.0, // 100% visible
        delay: 2000 // callback trigger after 2 secs
      };
      observer = new IntersectionObserver(observerCallback, options);
      if (elementRef.current) {
        observer.observe(elementRef.current);
      }
    }
    return () => {
      if (observer) {
        // unobserve all observers
        observer.disconnect();
      }
    };
  }, [observerCallback]);

  return (
    <div className="list-wrapper" ref={rootRef}>
      <ul className="list">
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page?.results?.map((user, index) => (
              <li key={user.login.uuid} className="list-user">
                {`${limit * i + index + 1}. ${user.name.last}, ${
                  user.name.first
                }`}
                <span>{user.location.country}</span>
              </li>
            ))}
          </React.Fragment>
        ))}
        <li className="loading" ref={elementRef}>
          {isFetching && <Loading />}
          {!isFetching && <span>Load more</span>}
        </li>
      </ul>
    </div>
  );
};

export default Users;
