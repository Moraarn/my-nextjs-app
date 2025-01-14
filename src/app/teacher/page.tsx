'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarDateRangePicker } from '@/components/date-range-picker'
import { supabase } from '@/lib/supabase'

async function getTeacherClasses() {
  const { data: classes } = await supabase
    .from('classes')
    .select(`
      *,
      enrollments(
        id,
        student:users(full_name)
      )
    `)
    .order('start_time', { ascending: false })
  
  return classes || []
}

export default async function TeacherPage() {
  const classes = await getTeacherClasses()

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Teacher Portal</h1>
          <div className="flex items-center gap-4">
            <CalendarDateRangePicker />
            <Button>Create New Class</Button>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Classes</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="materials">Teaching Materials</TabsTrigger>
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
                  <div className="text-2xl font-bold">{classes.length}</div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4">
              {classes.map((classItem) => (
                <Card key={classItem.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      <span>{classItem.title}</span>
                      <span className="text-sm bg-primary/10 px-2 py-1 rounded">
                        {classItem.level}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Date:</span>
                          <span>{new Date(classItem.start_time).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Time:</span>
                          <span>{new Date(classItem.start_time).toLocaleTimeString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Duration:</span>
                          <span>{classItem.duration_minutes} minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Enrolled Students:</span>
                          <span>{classItem.enrollments.length} / {classItem.max_students}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Enrolled Students:</h4>
                        <ul className="space-y-1">
                          {classItem.enrollments.map((enrollment) => (
                            <li key={enrollment.id} className="text-sm">
                              {enrollment.student.full_name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Manage your students and track their progress.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials">
            <Card>
              <CardHeader>
                <CardTitle>Teaching Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Access and manage your teaching materials.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
