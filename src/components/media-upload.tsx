"use client"
import { useRef } from "react"
import { Button } from "./ui/button"

export function MediaUpload({ articleId }: { articleId: number }) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)
    formData.append("articleId", articleId.toString())

    await fetch("/api/media", {
      method: "POST",
      body: formData
    })
  }

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        onChange={handleUpload}
        className="hidden"
      />
      <Button onClick={() => inputRef.current?.click()}>
        Upload Media
      </Button>
    </div>
  )
}