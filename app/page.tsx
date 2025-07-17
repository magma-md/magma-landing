// noinspection XmlDeprecatedElement,HtmlUnknownAnchorTarget,JSDeprecatedSymbols

"use client";

import {Download, FileText, Zap, Code, Users, GithubIcon} from "lucide-react";
import { useShader } from "@/hooks/useShader";
import {useEffect} from "react";

export default function Home() {
  const canvasRef = useShader('/shader/magma.frag');

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
      <div className="min-h-screen bg-black">
        <section className="relative min-h-screen overflow-hidden">
          <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 min-h-screen flex flex-col">
            <header className="flex justify-between items-center p-6 lg:p-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-md flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Magma MD</span>
              </div>

              <nav className="hidden md:flex space-x-8">
                <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
                <a href="#download" className="text-white/80 hover:text-white transition-colors">Download</a>
                <a href="https://github.com/magma-md" className="text-white/80 hover:text-white transition-colors">GitHub</a>
              </nav>
            </header>

            <main className="flex-1 flex items-center justify-center px-6 lg:px-8">
              <div className="text-center max-w-4xl">
                <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                  Write Markdown
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                  Like Fire
                </span>
                </h1>

                <p className="text-xl lg:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
                  A blazing fast, open-source markdown editor, syntax highlighting,
                  and powerful features for modern writers.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a href="#download"
                     className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>Download Free</span>
                  </a>

                  <a href="https://github.com/magma-md"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-200 flex items-center space-x-2"
                  >
                    <GithubIcon className="w-5 h-5" />
                    <span>View on GitHub</span>
                  </a>
                </div>
              </div>
            </main>
          </div>
        </section>

        <section id="features" className="py-20 px-6 lg:px-8 bg-neutral-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-center text-white mb-16">
              Features That <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Ignite</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-8 hover:bg-neutral-800/70 transition-all duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Lightning Fast</h3>
                <p className="text-white/70">
                  Blazing fast performance with instant preview updates and smooth editing experience.
                </p>
              </div>

              <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-8 hover:bg-neutral-800/70 transition-all duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-6">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Syntax Highlighting</h3>
                <p className="text-white/70">
                  Coming soon: Beautiful syntax highlighting for code blocks with support for 100+ languages.
                </p>
              </div>

              <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-8 hover:bg-neutral-800/70 transition-all duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Open Source</h3>
                <p className="text-white/70">
                  Completely free and open source. Join our community and/or contribute to the project.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="download" className="py-20 px-6 lg:px-8 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
              Get Started <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Today</span>
            </h2>

            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Download Magma MD for your platform and start writing beautiful markdown with the power of fire.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-neutral-900 rounded-lg p-6 hover:bg-neutral-800 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-2">Linux</h3>
                <p className="text-white/60 text-sm mb-4">AppImage & Deb</p>
                <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-md hover:from-red-600 hover:to-orange-600 transition-all">
                  Download
                </button>
              </div>

              <div className="bg-neutral-900 rounded-lg p-6 hover:bg-neutral-800 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-2">macOS</h3>
                <p className="text-white/60 text-sm mb-4">Intel & Apple Silicon</p>
                <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-md hover:from-red-600 hover:to-orange-600 transition-all">
                  Download
                </button>
              </div>

              <div className="bg-neutral-900 rounded-lg p-6 hover:bg-neutral-800 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-2">Windows</h3>
                <p className="text-white/60 text-sm mb-4">Dont support Microsoft</p>
                <button
                    onClick={() => window.location.href = 'https://linuxmint.com/'}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-md hover:from-red-600 hover:to-orange-600 transition-all">
                  I&#39;ll use Linux
                </button>
              </div>
            </div>
            </div>
        </section>

        <footer className="py-8 px-6 lg:px-8 border-t border-white/20 bg-neutral-900">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-sm flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold">Magma MD</span>
            </div>

            <div className="flex space-x-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Terms</a>
              <a href="https://github.com/magma-md" className="text-white/60 hover:text-white transition-colors">GitHub</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Support</a>
            </div>

            <p className="text-white/60 text-sm mt-4 md:mt-0">
              &copy; {new Date().getFullYear() || "2025"} Magma MD. Open source is {"<3"}
            </p>
          </div>
        </footer>
      </div>
  );
}