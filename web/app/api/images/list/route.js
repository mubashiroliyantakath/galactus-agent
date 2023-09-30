export const dynamic = 'force-dynamic'
import error from "@/app/dashboard/error";
import { NextResponse } from "next/server";

export async function GET(request) {
        const res = await fetch(`${process.env.GALACTUS_AGENT_API}/api/v1/images/list`,{ cache: 'no-store' })
        const data = await res.json()
        return NextResponse.json(data)
}
