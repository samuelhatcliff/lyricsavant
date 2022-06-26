import axios from 'axios';
import useSWR from 'swr';
const fetcher = async () => {
    return await axios.get(`/api/seed/status`);
};

function SWR() {
    const { data, error, isValidating } = useSWR('http://localhost:5000', fetcher, { refreshInterval: 1000 })
    let extracted = data['data']['data']
    let index = data['data']['data'].length
    console.log(extracted[index - 1], index, "swr data")
    console.log(error, "swr error")
    console.log(isValidating, "isValidating")
}

export default SWR