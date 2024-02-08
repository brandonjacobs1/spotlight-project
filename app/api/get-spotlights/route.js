import {getAllSpotlights} from "@/lib/db/get-all-spotlights";
import getImageUrl from "@/lib/s3/get-image";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        let spotlights = await getAllSpotlights()

        let promises = spotlights.map(s => {
            if (s.image) return getImageUrl(`${s.image}`)
        })
        const imageUrls = await Promise.all(promises);

        spotlights.forEach((spotlight, index) => {
            spotlight.imageUrl = imageUrls[index];
        });
        spotlights = filterByStatus(spotlights)
        return NextResponse.json({success: true, spotlights, error:false})
    } catch (e) {
        return NextResponse.json({success:false, error: e, spotlights:[]})
    }
}

function filterByStatus(spotlights) {
    return spotlights.reduce((sorted, s) => {
        sorted[s.status] = [...(sorted[s.status] || []), s];
        return sorted;
    }, {});
}