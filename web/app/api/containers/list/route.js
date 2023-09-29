import { NextResponse } from "next/server";

export async function GET(request) {
        const res = await fetch(`${process.env.GALACTUS_AGENT_API}/api/v1/containers/list`)
        const data = await res.json()
        return NextResponse.json(data)
}
