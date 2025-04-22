"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Trash2 } from "lucide-react"

interface EditGuidelinesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  rules: string[]
}

export function EditGuidelinesDialog({ open, onOpenChange, rules }: EditGuidelinesDialogProps) {
  const [guidelines, setGuidelines] = useState<string[]>([...rules])
  const [newGuideline, setNewGuideline] = useState("")

  const handleAddGuideline = () => {
    if (newGuideline.trim()) {
      setGuidelines([...guidelines, newGuideline.trim()])
      setNewGuideline("")
    }
  }

  const handleRemoveGuideline = (index: number) => {
    const updatedGuidelines = [...guidelines]
    updatedGuidelines.splice(index, 1)
    setGuidelines(updatedGuidelines)
  }

  const handleUpdateGuideline = (index: number, value: string) => {
    const updatedGuidelines = [...guidelines]
    updatedGuidelines[index] = value
    setGuidelines(updatedGuidelines)
  }

  const handleSave = () => {
    // Here you would typically save the changes to your backend
    console.log("Saving guidelines:", guidelines)

    // Close the dialog
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Community Guidelines</DialogTitle>
          <DialogDescription>Update the rules and guidelines for your community.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label>Current Guidelines</Label>
          {guidelines.map((guideline, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                {index + 1}
              </div>
              <Input
                value={guideline}
                onChange={(e) => handleUpdateGuideline(index, e.target.value)}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveGuideline(index)}
                className="h-8 w-8 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="flex items-center gap-2 mt-2">
            <Input
              placeholder="Add new guideline..."
              value={newGuideline}
              onChange={(e) => setNewGuideline(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddGuideline()
                }
              }}
            />
            <Button onClick={handleAddGuideline} size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Guidelines</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
