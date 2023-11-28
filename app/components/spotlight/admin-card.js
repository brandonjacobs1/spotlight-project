import Image from "next/image";

function AdminCard({spotlight}){
    return <>
        <div className="col">
            <div className="card">
                {spotlight.image ?
                    <Image src={spotlight.imageUrl} alt={'Image of couple'} layout='fill' objectFit='cover'></Image>
                :
                    <p>No image available</p>
                }
                <div className="card-body">
                    <h5 className="card-title">
                        {spotlight.first_name_husband} and {spotlight.first_name_wife} {spotlight.last_name}
                    </h5>
                    <p className="card-text text-truncate">{ spotlight.bio }</p>
                </div>
            </div>
        </div>
    </>
}

export default AdminCard