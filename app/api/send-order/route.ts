import { type NextRequest, NextResponse } from "next/server"
import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore"
import { Resend } from "resend"

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.fullName || !body.phone || !body.address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Save to Firebase
    const docRef = await addDoc(collection(db, "orders"), {
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      address: body.address,
      units: body.units,
      price: body.price,
      createdAt: Timestamp.now(),
      status: "pending",
      paymentMethod: "cash_on_delivery",
    })

    // Prepare email content (plain, no tables or order ID)
    const emailHtml = `
      <div style="font-family: Arial, sans-serif;">
        <p><strong>New Spin Scrubber Order Received</strong></p>
        <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Name:</strong> ${body.fullName}</p>
        <p><strong>Email:</strong> ${body.email ? body.email : "N/A"}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Delivery Address:</strong> ${body.address}</p>
        <p><strong>Units:</strong> ${body.units}</p>
        <p><strong>Total (Pay on Delivery):</strong> GH₵${body.price.toLocaleString()}</p>
        <p><strong>Payment Method:</strong> Cash on Delivery</p>
      </div>
    `

    // Send email notification
    const emailPayload = {
      from: "onboarding@resend.dev",
      to: process.env.RESEND_TO_EMAIL || "allthegoodthings14@gmail.com",
      subject: `New Spin Scrubber Order - ${body.fullName}`,
      html: emailHtml,
    } as const

    await resend.emails.send({
      ...emailPayload,
      ...(body.email ? { replyTo: body.email } : {}),
    })


    return NextResponse.json(
      {
        success: true,
        orderId: docRef.id,
        message: "Order received and notification sent",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing order:", error)
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 })
  }
}
