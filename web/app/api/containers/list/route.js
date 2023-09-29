import { NextResponse } from "next/server";

export async function GET(request) {
        const res = await fetch("http://127.0.0.1:7867/api/v1/containers/list")
        const data = await res.json()
        return NextResponse.json(data)
}
