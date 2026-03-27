"use client";

import React from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  CreditCard,
  FileText,
  Settings,
  Star,
  Check,
  X,
  ArrowRight,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Calendar,
  Download,
  Heart,
  MessageSquare,
  Eye,
  MoreHorizontal,
  Plus,
} from "lucide-react";

export default function CardPage() {
  return (
    <DocsContent
      title="Card"
      description="A flexible and customizable card component for displaying content in a structured layout. Perfect for dashboards, forms, and content cards."
      importPath='import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";'
    >

      {/* ══════════════════════════════════════
          1. BASIC USAGE
      ══════════════════════════════════════ */}
      <Section
        id="basic"
        title="Basic Usage"
        description="A simple card with header, content, and footer sections."
      >
        <ComponentPreview
          code={`<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent>
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Name of your project" />
        </div>
      </div>
    </form>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>`}
        >
          <div className="w-full max-w-sm mx-auto">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Name of your project" />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Deploy</Button>
              </CardFooter>
            </Card>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. CARD VARIATIONS
      ══════════════════════════════════════ */}
      <Section
        id="variations"
        title="Card Variations"
        description="Different card styles and layouts for various use cases."
      >
        {/* Simple Card */}
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold mb-3">Simple Card</h4>
            <ComponentPreview
              code={`<Card className="w-[300px]">
    <CardContent className="pt-6">
      <div className="flex items-center space-x-4">
        <Bell className="h-8 w-8 text-blue-500" />
        <div className="flex-1">
          <p className="text-sm font-medium">Notifications</p>
          <p className="text-xs text-muted-foreground">Manage your alerts</p>
        </div>
        <Button size="sm" variant="outline">View</Button>
      </div>
    </CardContent>
  </Card>`}
            >
              <div className="w-full max-w-sm mx-auto">
                <Card className="w-[300px]">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4">
                      <Bell className="h-8 w-8 text-blue-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Notifications</p>
                        <p className="text-xs text-muted-foreground">Manage your alerts</p>
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ComponentPreview>
          </div>

          {/* Stats Card */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Stats Card</h4>
            <ComponentPreview
              code={`<Card className="w-[300px]">
    <CardContent className="pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold">$45,231</p>
          <p className="text-xs text-green-600">+20.1% from last month</p>
        </div>
        <TrendingUp className="h-8 w-8 text-green-500" />
      </div>
    </CardContent>
  </Card>`}
            >
              <div className="w-full max-w-sm mx-auto">
                <Card className="w-[300px]">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                        <p className="text-2xl font-bold">$45,231</p>
                        <p className="text-xs text-green-600">+20.1% from last month</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ComponentPreview>
          </div>

          {/* Profile Card */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Profile Card</h4>
            <ComponentPreview
              code={`<Card className="w-[300px]">
    <CardHeader className="text-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"></div>
      <CardTitle>Alex Johnson</CardTitle>
      <CardDescription>Product Designer</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex justify-around text-center">
        <div>
          <p className="text-2xl font-bold">128</p>
          <p className="text-xs text-muted-foreground">Projects</p>
        </div>
        <div>
          <p className="text-2xl font-bold">2.3k</p>
          <p className="text-xs text-muted-foreground">Followers</p>
        </div>
        <div>
          <p className="text-2xl font-bold">89</p>
          <p className="text-xs text-muted-foreground">Following</p>
        </div>
      </div>
    </CardContent>
  </Card>`}
            >
              <div className="w-full max-w-sm mx-auto">
                <Card className="w-[300px]">
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"></div>
                    <CardTitle>Alex Johnson</CardTitle>
                    <CardDescription>Product Designer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-around text-center">
                      <div>
                        <p className="text-2xl font-bold">128</p>
                        <p className="text-xs text-muted-foreground">Projects</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">2.3k</p>
                        <p className="text-xs text-muted-foreground">Followers</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">89</p>
                        <p className="text-xs text-muted-foreground">Following</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ComponentPreview>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          3. PRICING CARDS
      ══════════════════════════════════════ */}
      <Section
        id="pricing"
        title="Pricing Cards"
        description="Beautiful pricing cards for subscription plans and services."
      >
        <div className="space-y-6">
          {/* Free Plan */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Free Plan</h4>
            <ComponentPreview
              code={`<Card className="w-[320px]">
    <CardHeader>
      <CardTitle className="text-center">Free</CardTitle>
      <CardDescription className="text-center">Perfect for getting started</CardDescription>
      <div className="text-center">
        <span className="text-4xl font-bold">$0</span>
        <span className="text-muted-foreground">/month</span>
      </div>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          5 Projects
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          Basic Support
        </li>
        <li className="flex items-center gap-2">
          <X className="h-4 w-4 text-red-500" />
          Advanced Analytics
        </li>
      </ul>
    </CardContent>
    <CardFooter>
      <Button className="w-full" variant="outline">Get Started</Button>
    </CardFooter>
  </Card>`}
            >
              <div className="w-full max-w-sm mx-auto">
                <Card className="w-[320px]">
                  <CardHeader>
                    <CardTitle className="text-center">Free</CardTitle>
                    <CardDescription className="text-center">Perfect for getting started</CardDescription>
                    <div className="text-center">
                      <span className="text-4xl font-bold">$0</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        5 Projects
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Basic Support
                      </li>
                      <li className="flex items-center gap-2">
                        <X className="h-4 w-4 text-red-500" />
                        Advanced Analytics
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">Get Started</Button>
                  </CardFooter>
                </Card>
              </div>
            </ComponentPreview>
          </div>

          {/* Premium Plan */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Premium Plan</h4>
            <ComponentPreview
              code={`<Card className="w-[320px] border-blue-500 shadow-lg">
    <CardHeader>
      <div className="flex items-center justify-center">
        <Badge className="mb-2 bg-blue-500">Most Popular</Badge>
      </div>
      <CardTitle className="text-center">Premium</CardTitle>
      <CardDescription className="text-center">For professionals</CardDescription>
      <div className="text-center">
        <span className="text-4xl font-bold">$29</span>
        <span className="text-muted-foreground">/month</span>
      </div>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          Unlimited Projects
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          Priority Support
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          Advanced Analytics
        </li>
      </ul>
    </CardContent>
    <CardFooter>
      <Button className="w-full bg-blue-500 hover:bg-blue-600">Get Started</Button>
    </CardFooter>
  </Card>`}
            >
              <div className="w-full max-w-sm mx-auto">
                <Card className="w-[320px] border-blue-500 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-center">
                      <Badge className="mb-2 bg-blue-500">Most Popular</Badge>
                    </div>
                    <CardTitle className="text-center">Premium</CardTitle>
                    <CardDescription className="text-center">For professionals</CardDescription>
                    <div className="text-center">
                      <span className="text-4xl font-bold">$29</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Unlimited Projects
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Priority Support
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Advanced Analytics
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600">Get Started</Button>
                  </CardFooter>
                </Card>
              </div>
            </ComponentPreview>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          4. DASHBOARD CARDS
      ══════════════════════════════════════ */}
      <Section
        id="dashboard"
        title="Dashboard Cards"
        description="Cards designed for dashboards and analytics interfaces."
      >
        <div className="space-y-6">
          {/* Activity Card */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Activity Feed</h4>
            <ComponentPreview
              code={`<Card className="w-[350px]">
    <CardHeader>
      <CardTitle className="text-lg">Recent Activity</CardTitle>
      <CardDescription>Latest updates from your team</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
          <div className="flex-1">
            <p className="text-sm font-medium">New project created</p>
            <p className="text-xs text-muted-foreground">2 hours ago</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
          <div className="flex-1">
            <p className="text-sm font-medium">Task completed</p>
            <p className="text-xs text-muted-foreground">5 hours ago</p>
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full">View All Activity</Button>
    </CardFooter>
  </Card>`}
            >
              <div className="w-full max-w-sm mx-auto">
                <Card className="w-[350px]">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                    <CardDescription>Latest updates from your team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">New project created</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Task completed</p>
                          <p className="text-xs text-muted-foreground">5 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View All Activity</Button>
                  </CardFooter>
                </Card>
              </div>
            </ComponentPreview>
          </div>

          {/* Task Card */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Task Overview</h4>
            <ComponentPreview
              code={`<Card className="w-[350px]">
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg">Tasks</CardTitle>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-lg border">
          <input type="checkbox" className="rounded" />
          <div className="flex-1">
            <p className="text-sm font-medium">Review design mockups</p>
            <p className="text-xs text-muted-foreground">Due today</p>
          </div>
          <Badge variant="secondary">High</Badge>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg border">
          <input type="checkbox" className="rounded" checked />
          <div className="flex-1">
            <p className="text-sm font-medium line-through text-muted-foreground">Update documentation</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <Badge variant="outline">Low</Badge>
        </div>
      </div>
    </CardContent>
  </Card>`}
            >
              <div className="w-full max-w-sm mx-auto">
                <Card className="w-[350px]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Tasks</CardTitle>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg border">
                        <input type="checkbox" className="rounded" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Review design mockups</p>
                          <p className="text-xs text-muted-foreground">Due today</p>
                        </div>
                        <Badge variant="secondary">High</Badge>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg border">
                        <input type="checkbox" className="rounded" checked />
                        <div className="flex-1">
                          <p className="text-sm font-medium line-through text-muted-foreground">Update documentation</p>
                          <p className="text-xs text-muted-foreground">Completed</p>
                        </div>
                        <Badge variant="outline">Low</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ComponentPreview>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          5. MEDIA CARDS
      ══════════════════════════════════════ */}
      <Section
        id="media"
        title="Media Cards"
        description="Cards with images, videos, and other media content."
      >
        <div className="space-y-6">
          {/* Product Card */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Product Card</h4>
            <ComponentPreview
              code={`<Card className="w-[300px] overflow-hidden">
    <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100"></div>
    <CardHeader>
      <CardTitle className="text-lg">Premium Headphones</CardTitle>
      <CardDescription>High-quality wireless audio experience</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex items-center gap-2 mb-3">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <Star className="h-4 w-4 text-gray-300" />
        <span className="text-sm text-muted-foreground">(4.0)</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">$299</span>
        <Button size="sm">Add to Cart</Button>
      </div>
    </CardContent>
  </Card>`}
            >
              <div className="w-full max-w-sm mx-auto">
                <Card className="w-[300px] overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100"></div>
                  <CardHeader>
                    <CardTitle className="text-lg">Premium Headphones</CardTitle>
                    <CardDescription>High-quality wireless audio experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 text-gray-300" />
                      <span className="text-sm text-muted-foreground">(4.0)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">$299</span>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ComponentPreview>
          </div>

          {/* Blog Card */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Blog Card</h4>
            <ComponentPreview
              code={`<Card className="w-[350px] overflow-hidden">
    <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-500"></div>
    <CardHeader>
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="secondary">Technology</Badge>
        <span className="text-xs text-muted-foreground">5 min read</span>
      </div>
      <CardTitle className="text-lg">The Future of Web Development</CardTitle>
      <CardDescription>Exploring emerging trends and technologies</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-300"></div>
          <span className="text-sm text-muted-foreground">John Doe</span>
        </div>
        <span className="text-xs text-muted-foreground">Mar 15, 2024</span>
      </div>
    </CardContent>
  </Card>`}
            >
              <div className="w-full max-w-sm mx-auto">
                <Card className="w-[350px] overflow-hidden">
                  <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">Technology</Badge>
                      <span className="text-xs text-muted-foreground">5 min read</span>
                    </div>
                    <CardTitle className="text-lg">The Future of Web Development</CardTitle>
                    <CardDescription>Exploring emerging trends and technologies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                        <span className="text-sm text-muted-foreground">John Doe</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Mar 15, 2024</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ComponentPreview>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          6. INTERACTIVE CARDS
      ══════════════════════════════════════ */}
      <Section
        id="interactive"
        title="Interactive Cards"
        description="Cards with interactive elements and user actions."
      >
        <div className="space-y-6">
          {/* Settings Card */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Settings Card</h4>
            <ComponentPreview
              code={`<Card className="w-[350px]">
    <CardHeader>
      <CardTitle className="text-lg">Notifications</CardTitle>
      <CardDescription>Manage your notification preferences</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Push Notifications</p>
            <p className="text-xs text-muted-foreground">Receive push notifications</p>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Email Notifications</p>
            <p className="text-xs text-muted-foreground">Receive email updates</p>
          </div>
          <Switch checked />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">SMS Notifications</p>
            <p className="text-xs text-muted-foreground">Receive text messages</p>
          </div>
          <Switch />
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full">Save Changes</Button>
    </CardFooter>
  </Card>`}
            >
              <div className="w-full max-w-sm mx-auto">
                <Card className="w-[350px]">
                  <CardHeader>
                    <CardTitle className="text-lg">Notifications</CardTitle>
                    <CardDescription>Manage your notification preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Push Notifications</p>
                          <p className="text-xs text-muted-foreground">Receive push notifications</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Email Notifications</p>
                          <p className="text-xs text-muted-foreground">Receive email updates</p>
                        </div>
                        <Switch checked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">SMS Notifications</p>
                          <p className="text-xs text-muted-foreground">Receive text messages</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Save Changes</Button>
                  </CardFooter>
                </Card>
              </div>
            </ComponentPreview>
          </div>

          {/* Action Card */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Action Card</h4>
            <ComponentPreview
              code={`<Card className="w-[350px]">
    <CardHeader>
      <CardTitle className="text-lg">Quick Actions</CardTitle>
      <CardDescription>Common tasks and shortcuts</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-16 flex flex-col gap-1">
          <Download className="h-5 w-5" />
          <span className="text-xs">Download</span>
        </Button>
        <Button variant="outline" className="h-16 flex flex-col gap-1">
          <FileText className="h-5 w-5" />
          <span className="text-xs">Export</span>
        </Button>
        <Button variant="outline" className="h-16 flex flex-col gap-1">
          <Users className="h-5 w-5" />
          <span className="text-xs">Share</span>
        </Button>
        <Button variant="outline" className="h-16 flex flex-col gap-1">
          <Settings className="h-5 w-5" />
          <span className="text-xs">Settings</span>
        </Button>
      </div>
    </CardContent>
  </Card>`}
            >
              <div className="w-full max-w-sm mx-auto">
                <Card className="w-[350px]">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                    <CardDescription>Common tasks and shortcuts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-16 flex flex-col gap-1">
                        <Download className="h-5 w-5" />
                        <span className="text-xs">Download</span>
                      </Button>
                      <Button variant="outline" className="h-16 flex flex-col gap-1">
                        <FileText className="h-5 w-5" />
                        <span className="text-xs">Export</span>
                      </Button>
                      <Button variant="outline" className="h-16 flex flex-col gap-1">
                        <Users className="h-5 w-5" />
                        <span className="text-xs">Share</span>
                      </Button>
                      <Button variant="outline" className="h-16 flex flex-col gap-1">
                        <Settings className="h-5 w-5" />
                        <span className="text-xs">Settings</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ComponentPreview>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          7. CARD LAYOUTS
      ══════════════════════════════════════ */}
      <Section
        id="layouts"
        title="Card Layouts"
        description="Different card layouts and arrangements for various UI patterns."
      >
        <div className="space-y-6">
          {/* Horizontal Card */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Horizontal Layout</h4>
            <ComponentPreview
              code={`<Card className="w-[400px]">
    <div className="flex">
      <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-l-xl"></div>
      <div className="flex-1">
        <CardHeader>
          <CardTitle className="text-lg">Mobile App Design</CardTitle>
          <CardDescription>Modern iOS and Android design</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">1.2k</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">89</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">23</span>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  </Card>`}
            >
              <div className="w-full max-w-md mx-auto">
                <Card className="w-[400px]">
                  <div className="flex">
                    <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-l-xl"></div>
                    <div className="flex-1">
                      <CardHeader>
                        <CardTitle className="text-lg">Mobile App Design</CardTitle>
                        <CardDescription>Modern iOS and Android design</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">1.2k</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">89</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">23</span>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </div>
            </ComponentPreview>
          </div>

          {/* Compact Card */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Compact Layout</h4>
            <ComponentPreview
              code={`<Card className="w-[350px]">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Zap className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium">Performance Boost</p>
            <p className="text-xs text-muted-foreground">+45% faster loading</p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </CardContent>
  </Card>`}
            >
              <div className="w-full max-w-sm mx-auto">
                <Card className="w-[350px]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Zap className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Performance Boost</p>
                          <p className="text-xs text-muted-foreground">+45% faster loading</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ComponentPreview>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          8. API REFERENCE
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">Card</p>
        <PropsTable props={[
          { name: "className", type: "string", default: "—", description: "Additional CSS classes." },
          { name: "children", type: "ReactNode", default: "—", description: "Card content." },
        ]} />

        <p className="text-sm font-semibold mb-3 mt-8">CardHeader</p>
        <PropsTable props={[
          { name: "className", type: "string", default: "—", description: "Additional CSS classes." },
          { name: "children", type: "ReactNode", default: "—", description: "Header content." },
        ]} />

        <p className="text-sm font-semibold mb-3 mt-8">CardTitle</p>
        <PropsTable props={[
          { name: "className", type: "string", default: "—", description: "Additional CSS classes." },
          { name: "children", type: "ReactNode", default: "—", description: "Title text." },
        ]} />

        <p className="text-sm font-semibold mb-3 mt-8">CardDescription</p>
        <PropsTable props={[
          { name: "className", type: "string", default: "—", description: "Additional CSS classes." },
          { name: "children", type: "ReactNode", default: "—", description: "Description text." },
        ]} />

        <p className="text-sm font-semibold mb-3 mt-8">CardContent</p>
        <PropsTable props={[
          { name: "className", type: "string", default: "—", description: "Additional CSS classes." },
          { name: "children", type: "ReactNode", default: "—", description: "Main content." },
        ]} />

        <p className="text-sm font-semibold mb-3 mt-8">CardFooter</p>
        <PropsTable props={[
          { name: "className", type: "string", default: "—", description: "Additional CSS classes." },
          { name: "children", type: "ReactNode", default: "—", description: "Footer content." },
        ]} />
      </Section>
    </DocsContent>
  );
}
