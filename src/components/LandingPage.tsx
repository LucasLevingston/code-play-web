"use client";

import { ArrowRight, Play, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { CustomButton } from "./custom/custom-button";

export function LandingPage() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center w-full text-white overflow-hidden">
			<div className="pt-32 pb-20 px-6 relative">
				<div className="max-w-7xl mx-auto">
					<div className="absolute top-20 left-1/4 w-96 h-96 bg-[#FF8B9B]/20 rounded-full blur-3xl opacity-20" />
					<div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-20" />

					<div className="relative z-10 text-center mb-16">
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
							<Sparkles className="w-4 h-4 text-[#FF8B9B]" />
							<span className="text-sm text-white/80">
								Bem-vindo ao CodePlay
							</span>
						</div>

						<h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
							Compartilhe sua
							<br />
							<span className="bg-gradient-to-r from-[#FF8B9B] to-[#FF7389] bg-clip-text text-transparent">
								visão técnica
							</span>
						</h1>

						<p className="text-xl md:text-2xl text-white/60 mb-8 max-w-2xl mx-auto">
							A plataforma de vídeos para desenvolvedores. Crie, compartilhe e
							descubra conteúdo de programação de qualidade.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="/auth/register">
								<CustomButton className="bg-gradient-to-r from-[#FF8B9B] to-[#FF7389] text-background font-bold px-8 py-6 text-lg rounded-full hover:shadow-lg hover:shadow-[#FF8B9B]/50 transition">
									Começar Agora
									<ArrowRight className="ml-2 w-5 h-5" />
								</CustomButton>
							</Link>
							<Link href="/auth/login">
								<CustomButton
									variant="outline"
									className="border-white/20 text-white px-8 py-6 text-lg rounded-full hover:bg-white/10"
								>
									Já tem conta?
								</CustomButton>
							</Link>
						</div>
					</div>
					<div className="grid md:grid-cols-3 gap-8 mt-24">
						{[
							{
								icon: Play,
								title: "Crie Conteúdo",
								description:
									"Faça upload de seus vídeos sobre programação com qualidade profissional",
							},
							{
								icon: Zap,
								title: "Compartilhe Conhecimento",
								description:
									"Conecte-se com outros desenvolvedores e expanda seu público",
							},
							{
								icon: Sparkles,
								title: "Descubra Trends",
								description:
									"Fique atualizado com os últimos trends em desenvolvimento",
							},
						].map((feature) => (
							<div
								key={feature.title}
								className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition group"
							>
								<feature.icon className="w-10 h-10 text-[#FF8B9B] mb-4 group-hover:scale-110 transition" />
								<h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
								<p className="text-white/60">{feature.description}</p>
							</div>
						))}
					</div>

					<div className="grid md:grid-cols-3 gap-8 mt-24 text-center">
						<div>
							<div className="text-4xl font-black text-[#FF8B9B]">10K+</div>
							<p className="text-white/60 mt-2">Vídeos Publicados</p>
						</div>
						<div>
							<div className="text-4xl font-black text-[#FF8B9B]">50K+</div>
							<p className="text-white/60 mt-2">Desenvolvedores Ativos</p>
						</div>
						<div>
							<div className="text-4xl font-black text-[#FF8B9B]">100+</div>
							<p className="text-white/60 mt-2">Categorias de Conteúdo</p>
						</div>
					</div>
				</div>
			</div>
			<div className="border-t border-white/10 py-12 px-6 bg-black/50 w-full">
				<div className="max-w-7xl mx-auto text-center">
					<h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
					<p className="text-white/60 mb-8">
						Junte-se à comunidade de desenvolvedores que estão compartilhando
						conhecimento no CodePlay
					</p>
					<Link href="/auth/register">
						<CustomButton>
							Criar Conta Gratuita
						</CustomButton>
					</Link>
				</div>
			</div>
		</div>
	);
}
