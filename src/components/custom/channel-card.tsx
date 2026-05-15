import { Channel } from "@/types/user";
import { Users, ArrowUpRight } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import SubscribeButton from "./button/subscribe-button";
import { CustomButton } from "./custom-button";

const ChannelCard = ({ channel }: { channel: Channel }) => {
   return (
      <div
         className="
				group relative overflow-hidden rounded-3xl
				border border-border/60
				bg-card/80 p-6 backdrop-blur-sm
				transition-all duration-300

				hover:-translate-y-1.5
				hover:border-primary/30
				hover:shadow-2xl hover:shadow-primary/10
			"
      >
         {/* Glow */}
         <div
            className="
					absolute inset-0 opacity-0 transition-opacity duration-500
					group-hover:opacity-100
				"
         >
            <div
               className="
						absolute -right-10 -top-10 h-40 w-40
						rounded-full bg-primary/10 blur-3xl
					"
            />

            <div
               className="
						absolute -bottom-16 -left-10 h-40 w-40
						rounded-full bg-primary/5 blur-3xl
					"
            />
         </div>

         <div className="relative z-10 flex flex-col items-center">
            {/* Avatar */}
            <div className="relative">
               <div
                  className="
							absolute inset-0 rounded-full
							bg-primary/20 blur-xl transition-all duration-300
							group-hover:scale-110
						"
               />

               <Image
                  src={channel.avatarUrl || "/default-avatar.png"}
                  alt={channel.name}
                  width={96}
                  height={96}
                  className="
							relative h-24 w-24 rounded-full
							border-4 border-background
							object-cover shadow-xl
						"
               />

               <div
                  className="
							absolute bottom-1 right-1
							h-4 w-4 rounded-full
							border-2 border-background
							bg-green-500 shadow
						"
               />
            </div>

            {/* Info */}
            <div className="mt-5 space-y-2 text-center">
               <h3
                  className="
							line-clamp-1 text-lg font-semibold
							tracking-tight text-foreground
						"
               >
                  {channel.name}
               </h3>

               <p
                  className="
							text-sm text-muted-foreground
						"
               >
                  @{channel.username}
               </p>

               <div
                  className="
							inline-flex items-center gap-2
							rounded-full border border-primary/10
							bg-primary/5 px-3 py-1.5
							text-xs font-medium text-primary
							backdrop-blur
						"
               >
                  <Users className="h-3.5 w-3.5" />

                  <span>
                     {channel.subscribersCount} inscritos
                  </span>
               </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex w-full gap-3">
               <Link
                  href={`/dashboard/channel/${channel.id}`}
                  className="flex-1"
               >
                  <CustomButton
                     variant="outline"
                     className="
								w-full rounded-2xl
								border-border/60
								bg-background/60
								backdrop-blur-sm

								text-black dark:text-white

								transition-all duration-300

								hover:border-primary/40
								hover:bg-primary/10
								hover:text-primary
							"
                  >
                     <span>Visitar</span>

                     <ArrowUpRight
                        className="
									h-4 w-4 transition-transform
									group-hover:translate-x-0.5
									group-hover:-translate-y-0.5
								"
                     />
                  </CustomButton>
               </Link>

               <SubscribeButton
                  channelId={channel.id}
                  isSubscribed={channel.isSubscribed}
               />
            </div>
         </div>
      </div>
   );
};

export default ChannelCard;