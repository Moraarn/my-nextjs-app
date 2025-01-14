import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

async function getClasses() {
  const { data: classes } = await supabase
    .from('classes')
    .select(`
      *,
      teacher:users(full_name)
    `)
    .gte('start_time', new Date().toISOString())
    .order('start_time')
  
  return classes || []
}

export default async function ClassesPage() {
  const classes = await getClasses()

  return (
    <div className="container py-8">
      <motion.div 
        className="flex flex-col gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Available Classes
          </h1>
          <Button variant="outline" className="hover:bg-primary/5">Filter Classes</Button>
        </div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {classes.map((classItem) => (
            <motion.div key={classItem.id} variants={item}>
              <Card className="flex flex-col h-full group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start group-hover:text-primary transition-colors">
                    <span>{classItem.title}</span>
                    <span className="text-sm font-normal px-2 py-1 bg-primary/10 rounded-md">
                      {classItem.level}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <span className="font-medium mr-2">Teacher:</span>
                        {classItem.teacher.full_name}
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium mr-2">Date:</span>
                        {format(new Date(classItem.start_time), 'PPP')}
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium mr-2">Time:</span>
                        {format(new Date(classItem.start_time), 'p')}
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium mr-2">Duration:</span>
                        {classItem.duration_minutes} minutes
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {classItem.description || 'Join this interactive German class designed for kids!'}
                    </p>
                  </div>
                  <Button className="w-full mt-4 group-hover:bg-primary/90 transition-colors">
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}