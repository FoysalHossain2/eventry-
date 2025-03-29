import HeroSection from "@/components/details/HeroSection"
import EventDetails from "@/components/details/EventDetails"
import EventVenue from "@/components/details/EventVenue"
import { getAllEventsId } from "@/db/queries"

// this is dynamic metadata 
export async function generateMetadata({params: {id}}) {
  const eventInfo = await getAllEventsId(id);
  return {
    title: `Eventry - ${eventInfo?.name}`,
    description: eventInfo?.details,
    openGraph: {
      images: [eventInfo?.imageUrl]
    }
  }
}

const EventDetailsPage = async ({params: {id}}) => {
  
  const eventInfo = await getAllEventsId(id);
  console.log(eventInfo);
  

  return (
    <div>
        <HeroSection eventInfo={eventInfo} />
        <section>
            <div className="grid grid-cols-5 gap-12 my-12">
                <EventDetails 
                  details={eventInfo?.details}
                  swags={eventInfo?.swags} 
                />
                <EventVenue location={eventInfo?.location} />
            </div>
        </section>
    </div>
  )
}

export default EventDetailsPage