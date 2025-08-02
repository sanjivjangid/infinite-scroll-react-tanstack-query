const fetchUsers = async ({ queryKey, pageParam: pageNumber }) => {
  const [_key, { limit }] = queryKey;
  const response = await fetch(
    `https://randomuser.me/api/?page=${pageNumber}&results=${limit}`
  );
  return await response.json();
};

export { fetchUsers };
