import {getAllSpotlights} from '@/lib/db/get-all-spotlights'
import getImageUrl from "@/lib/s3/get-image";
import Image from "next/image";

async function loadData() {
    let spotlights = await getAllSpotlights()
    let promises = spotlights.map(s => getImageUrl(`private/${s.image}`))
    const imageUrls = await Promise.all(promises);

    spotlights.forEach((spotlight, index) => {
        spotlight.imageUrl = imageUrls[index];
    });
    return spotlights
}
export default async function spotlightList() {
    const spotlights = await loadData()
        return (<div>
                {spotlights.map(s => (
                    <div key={s.id}>
                        <p key={s.id}>{s.first_name_husband} and {s.first_name_wife} {s.last_name}</p>
                        <Image src={s.imageUrl} alt={'Image of couple'} width={250} height={250}></Image>
                    </div>
                ))}
        </div>)
}