import { useContext } from 'react';

import { ApiContext } from '../contexts/apiContext';

const useApi = () => useContext(ApiContext);

export default useApi;
