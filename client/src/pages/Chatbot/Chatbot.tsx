import { Button } from "@/components/ui/button"
import { apiClient } from "@/lib/api-client";
import { SCRAPE_API } from "@/utils/constants";

const Chatbot = () => {

  const startScraperFunction = async () => {
    const response = await apiClient.post(SCRAPE_API, {}, {withCredentials: true});
    console.log("Response", response);
    console.log("DONE SCRAPING");
  };
  return (
    <div className="flex flex-col items-center w-screen h-screen justify-center">
      <h1>Chatbot</h1>
      <Button onClick={startScraperFunction}>Start Function</Button>
    </div>
  )
}

export default Chatbot