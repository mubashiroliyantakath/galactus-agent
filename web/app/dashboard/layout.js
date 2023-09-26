import Header from "@/components/Header";

export default function Images({
    children, // will be a page or nested layout
  }) {
    return (
        <>
            <Header/>
            {children}
        </>
    )
  }
