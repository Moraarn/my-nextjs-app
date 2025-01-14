"use client";

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Home() {
  return (
    <div className="flex-1">
      <section className="relative space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background -z-10" />
        <motion.div 
          className="container flex max-w-[64rem] flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-gradient">
            Learn German the Fun Way with KinderDeutsch
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Interactive online German lessons designed specifically for children. Join our engaging classes and start your language learning journey today!
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" className="animate-shimmer bg-gradient-to-r from-primary to-primary/80">
              <Link href="/classes">Browse Classes</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="hover:bg-primary/5">
              <Link href="/dashboard">Student Dashboard</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <section className="container space-y-6 py-8 md:py-12 lg:py-24 bg-dot-pattern">
        <motion.div 
          className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Everything you need to help your child learn German effectively
          </p>
        </motion.div>

        <motion.div 
          className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div variants={item}>
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">Live Interactive Classes</CardTitle>
                <CardDescription>Join live sessions with experienced teachers</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Real-time interaction with native German speakers in a fun, engaging environment.</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">Kid-Friendly Learning</CardTitle>
                <CardDescription>Designed for young learners</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Age-appropriate content and activities that make learning German enjoyable.</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">Progress Tracking</CardTitle>
                <CardDescription>Monitor learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Track your child's progress with detailed reports and achievements.</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      <section className="container py-8 md:py-12 lg:py-24 bg-primary/5">
        <motion.div 
          className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Start Learning Today
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Join our growing community of young German learners
          </p>
          <Button asChild size="lg" className="animate-shimmer bg-gradient-to-r from-primary to-primary/80">
            <Link href="/classes">View Available Classes</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  )
}