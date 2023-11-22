import {useEffect, useState} from "react";
import {getChannelApi} from "@/apis/article";

export function useChannel() {
  const [channelList, setChannelList] = useState([])
  useEffect(() => {
    const getChannelList = async () => {
      const result = await getChannelApi();
      setChannelList(result.data.channels)
    }
    getChannelList()
  }, []);
  return {
    channelList
  }
}