'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarDateRangePicker } from '@/components/date-range-picker'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

async function getEnrollments() {
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`*,
      class:classes(
        title,
        start_time,
        duration_minutes,
        teacher:users(full_name)
      )`)
    .eq('status', 'enrolled')
    .order('created_at', { ascending: false })

  return enrollments || []
}

export default async function DashboardPage() {
  const enrollments = await getEnrollments()

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <div className="flex items-center gap-4">
            <CalendarDateRangePicker />
            <Button>Download Report</Button>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Classes</TabsTrigger>
            <TabsTrigger value="completed">Completed Classes</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Classes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{enrollments.length}</div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4">
              {enrollments.map((enrollment) => (
                <Card key={enrollment.id}>
                  <CardHeader>
                    <CardTitle>{enrollment.class.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Teacher:</span>
                        <span>{enrollment.class.teacher.full_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Date:</span>
                        <span>{new Date(enrollment.class.start_time).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Time:</span>
                        <span>{new Date(enrollment.class.start_time).toLocaleTimeString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Duration:</span>
                        <span>{enrollment.class.duration_minutes} minutes</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Classes History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  View your completed classes and achievements.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track your German language learning journey.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
