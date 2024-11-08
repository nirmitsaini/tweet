"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Twitter, 
  MessageCircle, 
  Repeat2, 
  Heart, 
  Share2,
  CheckCircle2,
  Calendar,
  Smartphone,
  Download,
  Trash2
} from "lucide-react";
import * as htmlToImage from 'html-to-image';

interface Comment {
  name: string;
  username: string;
  profileImage: string;
  text: string;
  time: string;
  isLiked: boolean;
  isRetweeted: boolean;
}

interface TweetData {
  name: string;
  username: string;
  tweetText: string;
  profileImage: string;
  tweetImage: string;
  verified: boolean;
  theme: "light" | "dim" | "dark";
  time: string;
  date: string;
  device: string;
  retweetCount: string;
  likeCount: string;
  isLiked: boolean;
  isRetweeted: boolean;
  showFactCheck: boolean;
  comments: Comment[];
}

export default function Home() {
  const tweetRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("tweet");
  const [newComment, setNewComment] = useState<Comment>({
    name: "",
    username: "",
    profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=64&h=64&fit=crop&crop=faces",
    text: "",
    time: "4h",
    isLiked: false,
    isRetweeted: false
  });

  const [tweetData, setTweetData] = useState<TweetData>({
    name: "Zeoob",
    username: "zeooboffical",
    tweetText: "Build your own Twitter Tweet now! Check it out @Zeoob",
    profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=64&h=64&fit=crop&crop=faces",
    tweetImage: "",
    verified: true,
    theme: "light",
    time: "4:17 PM",
    date: "Jan 08, 2024",
    device: "Twitter for Android",
    retweetCount: "18k",
    likeCount: "14k",
    isLiked: false,
    isRetweeted: false,
    showFactCheck: false,
    comments: []
  });

  const handleInputChange = (field: keyof TweetData, value: string | boolean) => {
    setTweetData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCommentChange = (field: keyof Comment, value: string | boolean) => {
    setNewComment((prev) => ({ ...prev, [field]: value }));
  };

  const addComment = () => {
    if (newComment.text && newComment.name && newComment.username) {
      setTweetData((prev) => ({
        ...prev,
        comments: [...prev.comments, { ...newComment }]
      }));
      setNewComment({
        name: "",
        username: "",
        profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=64&h=64&fit=crop&crop=faces",
        text: "",
        time: "4h",
        isLiked: false,
        isRetweeted: false
      });
    }
  };

  const removeComment = (index: number) => {
    setTweetData((prev) => ({
      ...prev,
      comments: prev.comments.filter((_, i) => i !== index)
    }));
  };

  const downloadTweet = async () => {
    if (tweetRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(tweetRef.current);
        const link = document.createElement('a');
        link.download = 'tweet.png';
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error downloading tweet:', error);
      }
    }
  };

  const getThemeClass = () => {
    switch (tweetData.theme) {
      case "dark":
        return "bg-[#15202b] text-white";
      case "dim":
        return "bg-[#1a2634] text-white";
      default:
        return "bg-white text-black";
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">
        Fake Tweet Generator with Verification
      </h1>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Customize Your Tweet</h2>
          
          <Tabs defaultValue="tweet" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="tweet">Tweet</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>

            <TabsContent value="tweet" className="space-y-6">
              {/* Original tweet form fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Profile Image</Label>
                  <Input
                    type="text"
                    value={tweetData.profileImage}
                    onChange={(e) => handleInputChange("profileImage", e.target.value)}
                    placeholder="Profile image URL"
                  />
                </div>
                <div>
                  <Label>Tweet Image (optional)</Label>
                  <Input
                    type="text"
                    value={tweetData.tweetImage}
                    onChange={(e) => handleInputChange("tweetImage", e.target.value)}
                    placeholder="Tweet image URL"
                  />
                </div>
              </div>

              <div>
                <Label>Name</Label>
                <Input
                  value={tweetData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Display name"
                />
              </div>

              <div>
                <Label>Username</Label>
                <Input
                  value={tweetData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  placeholder="@username"
                />
              </div>

              <div>
                <Label>Tweet Text</Label>
                <Textarea
                  value={tweetData.tweetText}
                  onChange={(e) => handleInputChange("tweetText", e.target.value)}
                  placeholder="What's happening?"
                />
              </div>

              <div>
                <Label>Name of device</Label>
                <Input
                  value={tweetData.device}
                  onChange={(e) => handleInputChange("device", e.target.value)}
                  placeholder="Twitter for iPhone"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Label>Add Official Tick:</Label>
                <Switch
                  checked={tweetData.verified}
                  onCheckedChange={(checked) => handleInputChange("verified", checked)}
                />
              </div>

              <div>
                <Label>Theme:</Label>
                <RadioGroup
                  value={tweetData.theme}
                  onValueChange={(value) => handleInputChange("theme", value as "light" | "dim" | "dark")}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dim" id="dim" />
                    <Label htmlFor="dim">Dim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark">Dark</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Time</Label>
                  <Input
                    value={tweetData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    placeholder="4:17 PM"
                  />
                </div>
                <div>
                  <Label>Date</Label>
                  <Input
                    value={tweetData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    placeholder="Jan 08, 2024"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Retweets Count</Label>
                  <Input
                    value={tweetData.retweetCount}
                    onChange={(e) => handleInputChange("retweetCount", e.target.value)}
                    placeholder="18k"
                  />
                </div>
                <div>
                  <Label>Likes Count</Label>
                  <Input
                    value={tweetData.likeCount}
                    onChange={(e) => handleInputChange("likeCount", e.target.value)}
                    placeholder="14k"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Label>Liked Status:</Label>
                  <Switch
                    checked={tweetData.isLiked}
                    onCheckedChange={(checked) => handleInputChange("isLiked", checked)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Label>Retweet Status:</Label>
                  <Switch
                    checked={tweetData.isRetweeted}
                    onCheckedChange={(checked) => handleInputChange("isRetweeted", checked)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Label>Fact-check warning</Label>
                  <Switch
                    checked={tweetData.showFactCheck}
                    onCheckedChange={(checked) => handleInputChange("showFactCheck", checked)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comments" className="space-y-6">
              <div>
                <Label>Name</Label>
                <Input
                  value={newComment.name}
                  onChange={(e) => handleCommentChange("name", e.target.value)}
                  placeholder="Display name"
                />
              </div>

              <div>
                <Label>Username</Label>
                <Input
                  value={newComment.username}
                  onChange={(e) => handleCommentChange("username", e.target.value)}
                  placeholder="@username"
                />
              </div>

              <div>
                <Label>Profile Image</Label>
                <Input
                  value={newComment.profileImage}
                  onChange={(e) => handleCommentChange("profileImage", e.target.value)}
                  placeholder="Profile image URL"
                />
              </div>

              <div>
                <Label>Comment Text</Label>
                <Textarea
                  value={newComment.text}
                  onChange={(e) => handleCommentChange("text", e.target.value)}
                  placeholder="Write your comment..."
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Label>Liked Status:</Label>
                  <Switch
                    checked={newComment.isLiked}
                    onCheckedChange={(checked) => handleCommentChange("isLiked", checked)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Label>Retweet Status:</Label>
                  <Switch
                    checked={newComment.isRetweeted}
                    onCheckedChange={(checked) => handleCommentChange("isRetweeted", checked)}
                  />
                </div>
              </div>

              <Button onClick={addComment} className="w-full">
                Add Comment
              </Button>

              <div className="space-y-4 mt-6">
                <h3 className="font-semibold">Current Comments:</h3>
                {tweetData.comments.map((comment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">{comment.name}</p>
                      <p className="text-sm text-gray-500">@{comment.username}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeComment(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Preview Your Tweet</h2>
            <Button onClick={downloadTweet} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
          
          <div ref={tweetRef} className={`border rounded-xl p-4 ${getThemeClass()}`}>
            <div className="flex items-start space-x-3">
              <img
                src={tweetData.profileImage}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              
              <div className="flex-1">
                <div className="flex items-center space-x-1">
                  <span className="font-bold">{tweetData.name}</span>
                  {tweetData.verified && (
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  )}
                  <span className="text-gray-500">@{tweetData.username}</span>
                </div>

                <p className="mt-1">{tweetData.tweetText}</p>

                {tweetData.tweetImage && (
                  <img
                    src={tweetData.tweetImage}
                    alt="Tweet"
                    className="mt-3 rounded-xl max-h-96 w-full object-cover"
                  />
                )}

                <div className="flex items-center space-x-1 mt-2 text-gray-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{tweetData.time}</span>
                  <span>·</span>
                  <span>{tweetData.date}</span>
                  <span>·</span>
                  <Smartphone className="w-4 h-4" />
                  <span>{tweetData.device}</span>
                </div>

                {tweetData.showFactCheck && (
                  <div className="mt-3 p-3 border rounded-lg bg-gray-50 dark:bg-gray-900">
                    <Badge variant="secondary">
                      Fact-check warning
                    </Badge>
                    <p className="mt-2 text-sm">
                      This tweet contains potentially misleading information.
                    </p>
                  </div>
                )}

                <div className="flex justify-between mt-4 text-gray-500">
                  <button className="flex items-center space-x-2 hover:text-blue-500">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                  <button className={`flex items-center space-x-2 ${tweetData.isRetweeted ? "text-green-500" : ""} hover:text-green-500`}>
                    <Repeat2 className="w-5 h-5" />
                    <span>{tweetData.retweetCount}</span>
                  </button>
                  <button className={`flex items-center space-x-2 ${tweetData.isLiked ? "text-red-500" : ""} hover:text-red-500`}>
                    <Heart className="w-5 h-5" />
                    <span>{tweetData.likeCount}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-blue-500">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Comments Section */}
                {tweetData.comments.map((comment, index) => (
                  <div key={index} className="mt-4 pt-4 border-t">
                    <div className="flex items-start space-x-3">
                      <img
                        src={comment.profileImage}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-1">
                          <span className="font-bold">{comment.name}</span>
                          <span className="text-gray-500">@{comment.username}</span>
                          <span className="text-gray-500">· {comment.time}</span>
                        </div>
                        <p className="mt-1">{comment.text}</p>
                        <div className="flex justify-between mt-2 text-gray-500">
                          <button className="flex items-center space-x-2 hover:text-blue-500">
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          <button className={`flex items-center space-x-2 ${comment.isRetweeted ? "text-green-500" : ""} hover:text-green-500`}>
                            <Repeat2 className="w-4 h-4" />
                          </button>
                          <button className={`flex items-center space-x-2 ${comment.isLiked ? "text-red-500" : ""} hover:text-red-500`}>
                            <Heart className="w-4 h-4" />
                          </button>
                          <button className="flex items-center space-x-2 hover:text-blue-500">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}