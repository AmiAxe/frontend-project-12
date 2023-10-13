import { useContext } from 'react';

import { ApiContext } from '../contexts/index';

const useApi = () => useContext(ApiContext);

export default useApi;
