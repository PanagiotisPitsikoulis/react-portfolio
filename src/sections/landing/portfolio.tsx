"use client";

import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Wrapper from "@/components/chromaui/section/wrapper/component";
import { theme } from "@/components/chromaui/themes";
import { HomePageProps } from ".";
import {
  MediumAnimation,
  SlowAnimation,
  StaggeredAnimations,
} from "@/components/chromaui/section/animation/component";

const Portfolio = (props: HomePageProps) => {
  return (
    <section className="bg-background py-12" style={theme.secondary}>
      <Wrapper>
        <div className="space-y-8">
          <MediumAnimation>
            <div className="mb-4 flex items-center justify-center">
              <img
                className="size-6"
                alt="Copy paste icon"
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
              />
              <h2 className="text-center text-xl font-semibold tracking-tight text-foreground">
                Just Copy Paste
              </h2>
            </div>
          </MediumAnimation>

          <SlowAnimation delay={0.2}>
            <h1 className="text-center text-6xl font-bold tracking-tighter leading-20 text-foreground md:text-[100px]">
              Amazing
              <br />
              components
            </h1>
          </SlowAnimation>

          <MediumAnimation delay={0.4}>
            <p className="mx-auto mt-6 max-w-3xl text-center text-xl text-muted-foreground">
              Discover our collection of beautifully designed, ready-to-use
              components that you can easily integrate into your projects.
            </p>
          </MediumAnimation>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 100 }}
          transition={{ ease: [0, 0.71, 0.2, 1.01], duration: 0.8 }}
          className="relative mt-30 h-100"
        >
          <motion.div
            initial={{ y: 250 }}
            animate={{ y: 0 }}
            whileHover={{ y: -50 }}
            transition={{ ease: [0, 0.71, 0.2, 1.01], duration: 0.8 }}
            className="absolute top-20 left-0 z-8 hidden h-[350px] w-[550px] flex-col items-center justify-center rounded-3xl border border-border bg-muted p-2 md:flex"
          >
            <Card className="relative h-full w-full rounded-2xl border">
              <CardContent className="flex h-full w-full items-center justify-center p-0">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="size-3.5 rounded-full bg-red-500" />
                  <div className="size-3.5 rounded-full bg-yellow-500" />
                  <div className="size-3.5 rounded-full bg-green-500" />
                </div>
                {/* Browser Window Content */}
                <img
                  className="size-30"
                  alt="Block Logo"
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                />
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ y: 250 }}
            animate={{ y: 0 }}
            whileHover={{ y: -50 }}
            transition={{
              ease: [0, 0.71, 0.2, 1.01],
              duration: 0.8,
              delay: 0.05,
            }}
            className="absolute top-0 left-1/2 z-10 flex h-[350px] w-full max-w-[550px] -translate-x-1/2 flex-col items-center justify-center rounded-3xl border border-border bg-muted p-2"
          >
            <Card className="relative h-full w-full rounded-2xl border bg-foreground">
              <CardContent className="flex h-full w-full items-center justify-center p-0">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="size-3.5 rounded-full bg-red-500" />
                  <div className="size-3.5 rounded-full bg-yellow-500" />
                  <div className="size-3.5 rounded-full bg-green-500" />
                </div>
                {/* Browser Window Content */}
                <img
                  className="size-30"
                  alt="Block Logo"
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-white-1.svg"
                />
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ y: 250 }}
            animate={{ y: 0 }}
            whileHover={{ y: -50 }}
            transition={{
              ease: [0, 0.71, 0.2, 1.01],
              duration: 0.8,
              delay: 0.1,
            }}
            className="absolute -top-18 right-0 z-11 hidden h-[350px] w-[550px] flex-col items-center justify-center rounded-3xl border border-border bg-muted p-2 md:flex"
          >
            <Card className="relative h-full w-full rounded-2xl border">
              <CardContent className="flex h-full w-full items-center justify-center p-0">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="size-3.5 rounded-full bg-red-500" />
                  <div className="size-3.5 rounded-full bg-yellow-500" />
                  <div className="size-3.5 rounded-full bg-green-500" />
                </div>
                {/* Browser Window Content */}
                <img
                  className="size-30"
                  alt="Block Logo"
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Wrapper>
    </section>
  );
};

export { Portfolio };
