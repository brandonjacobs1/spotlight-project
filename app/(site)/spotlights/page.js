import {getAllSpotlights} from '@/lib/db/get-all-spotlights'
import getImageUrl from "@/lib/s3/get-image";
import AdminCard from "@/app/components/spotlight/admin-card";

async function loadData() {
    let spotlights = await getAllSpotlights()

    let promises = spotlights.map(s => {
        if (s.image) return getImageUrl(`${s.image}`)
    })
    const imageUrls = await Promise.all(promises);

    spotlights.forEach((spotlight, index) => {
        spotlight.imageUrl = imageUrls[index];
    });
    spotlights =  filterByStatus(spotlights)
    console.log(spotlights)
    return spotlights
}

function filterByStatus(spotlights) {
    return spotlights.reduce((sorted, s) => {
        sorted[s.status] = [...(sorted[s.status] || []), s];
        return sorted;
    }, {});
}

export default async function spotlightList() {
    const spotlights = await loadData()

        return <>
            {spotlights.NS ?
                <div>
                    <h2 className="display-5">Not Started</h2>
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {spotlights.NS.map(s => (
                            <AdminCard spotlight={s} Key={s.id}></AdminCard>
                        ))}
                    </div>
                </div>
                : null}

            {spotlights.A ?
                <div>
                    <h2 className="display-5">Asked</h2>
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {spotlights.A.map(s => (
                            <AdminCard spotlight={s} Key={s.id}></AdminCard>
                        ))}
                    </div>
                </div>
                : null}

            {spotlights.R ?
                <div>
                    <h2 className="display-5">Ready</h2>
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {spotlights.R.map(s => (
                            <AdminCard spotlight={s} Key={s.id}></AdminCard>
                        ))}
                    </div>
                </div>
                : null}

            {spotlights.P ?
                <div>
                    <h2 className="display-5">Planned</h2>
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {spotlights.P.map(s => (
                            <AdminCard spotlight={s} Key={s.id}></AdminCard>
                        ))}
                    </div>
                </div>
                : null}

            {spotlights.S ?
            <div>
                <h2 className="display-5">Slacked</h2>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                        {spotlights.S.map(s => (
                            <AdminCard spotlight={s} Key={s.id}></AdminCard>
                        ))}
                </div>
            </div>
            : null}
        </>
}