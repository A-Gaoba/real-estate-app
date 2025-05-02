"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageSquare, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// Mock data for user messages
const mockMessages = [
  {
    id: "msg1",
    from: {
      id: "user1",
      name: "John Doe",
      email: "john.doe@example.com",
      image: "/placeholder.svg?height=40&width=40",
    },
    property: {
      id: "prop1",
      title: "Modern Apartment with City View",
    },
    content: "Hi, I'm interested in viewing this property. Is it available this weekend?",
    createdAt: "2023-10-15T14:30:00Z",
    read: false,
  },
  {
    id: "msg2",
    from: {
      id: "user2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      image: "/placeholder.svg?height=40&width=40",
    },
    property: {
      id: "prop2",
      title: "Spacious Family Home",
    },
    content:
      "Hello, I'd like to know if the price is negotiable and if there are any additional fees I should be aware of.",
    createdAt: "2023-10-14T09:15:00Z",
    read: true,
  },
  {
    id: "msg3",
    from: {
      id: "user3",
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      image: "/placeholder.svg?height=40&width=40",
    },
    property: {
      id: "prop1",
      title: "Modern Apartment with City View",
    },
    content: "Is this property still available? I'm looking to move in next month.",
    createdAt: "2023-10-13T16:45:00Z",
    read: true,
  },
]

export default function UserMessages() {
  const { toast } = useToast()
  const [messages, setMessages] = useState(mockMessages)
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<(typeof mockMessages)[0] | null>(null)
  const [replyContent, setReplyContent] = useState("")

  useEffect(() => {
    // Simulate loading messages
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleDeleteMessage = async (messageId: string) => {
    try {
      // In a real app, this would call a server action to delete the message

      // For demo purposes, we'll just update the local state
      setMessages((prev) => prev.filter((m) => m.id !== messageId))

      toast({
        title: "Message deleted",
        description: "Message has been successfully deleted",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleMarkAsRead = async (messageId: string) => {
    try {
      // In a real app, this would call a server action to mark the message as read

      // For demo purposes, we'll just update the local state
      setMessages((prev) => prev.map((m) => (m.id === messageId ? { ...m, read: true } : m)))
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update message. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleReply = async () => {
    if (!selectedMessage || !replyContent.trim()) return

    try {
      // In a real app, this would call a server action to send the reply

      // For demo purposes, we'll just show a success message
      toast({
        title: "Reply sent",
        description: `Your reply to ${selectedMessage.from.name} has been sent`,
      })

      setReplyContent("")
      setSelectedMessage(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reply. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-1/4 mb-2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <MessageSquare className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No messages</h3>
        <p className="text-muted-foreground">You don't have any messages yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <Card key={message.id} className={`overflow-hidden ${!message.read ? "border-primary/50" : ""}`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <img
                src={message.from.image || "/placeholder.svg"}
                alt={message.from.name}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{message.from.name}</h4>
                    <p className="text-sm text-muted-foreground">{message.from.email}</p>
                  </div>

                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    {!message.read && <Badge variant="default">New</Badge>}
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mb-2">
                  <p className="text-sm text-muted-foreground">
                    Regarding: <span className="font-medium">{message.property.title}</span>
                  </p>
                </div>

                <p className="text-sm mb-4">{message.content}</p>

                <div className="flex flex-wrap gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedMessage(message)
                          if (!message.read) handleMarkAsRead(message.id)
                        }}
                      >
                        Reply
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reply to {message.from.name}</DialogTitle>
                        <DialogDescription>Regarding: {message.property.title}</DialogDescription>
                      </DialogHeader>

                      <div className="bg-muted p-3 rounded-md text-sm mb-4">
                        <p className="font-medium mb-1">Original message:</p>
                        <p>{message.content}</p>
                      </div>

                      <Textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Type your reply here..."
                        className="min-h-[120px]"
                      />

                      <DialogFooter className="mt-4">
                        <Button type="submit" onClick={handleReply}>
                          Send Reply
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {!message.read && (
                    <Button size="sm" variant="outline" onClick={() => handleMarkAsRead(message.id)}>
                      Mark as Read
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDeleteMessage(message.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
