export async function POST(request) {
        const res = await request.json()
        const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(res)
            }
        const result = await fetch(`${process.env.GALACTUS_AGENT_API}/api/v1/containers/action`, requestOptions)

        if (result.status === 200) {
                return new Response("Done", {status: 200})
        }
        else {
                return new Response("Failed", {status: 500})
        }

}
