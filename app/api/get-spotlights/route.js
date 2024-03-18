import { getAllSpotlights } from "@/lib/db/get-all-spotlights";
import getImageUrl from "@/lib/s3/get-image";
import Server from "next/server";

export async function POST() {
    try {
        let spotlights = await getAllSpotlights()

        let promises = spotlights.map(s => {
            if (s.image) return getImageUrl(`${s.image}`)
        })
        const imageUrls = await Promise.all(promises);

        spotlights.forEach((spotlight, index) => {
            spotlight.imageUrl = imageUrls[index];
        });
        spotlights = spotlights.reduce((sorted, s) => {
            sorted[s.status] = [...(sorted[s.status] || []), s];
            return sorted;
        }, {});

        return Server.NextResponse.json({success: true, spotlights, error:false})
    } catch (e) {
        return Server.NextResponse.json({success:false, error: e, spotlights:[]})
    }
}
