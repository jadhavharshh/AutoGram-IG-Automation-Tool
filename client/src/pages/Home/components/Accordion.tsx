import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="flex flex-col text-center mb-12">
                <h2 className="text-3xl font-bold  tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white mx-auto py-2 [text-shadow:0px_1px_3px_rgba(27,37,80,0.14)] md:text-3xl lg:text-5xl">
                    Frequently Asked Questions
                </h2>
                <p className="text-lg text-neutral-300 mt-4">
                    Everything you need to know about Autogram
                </p>
            </div>

            <Accordion 
                type="single" 
                collapsible 
                className="w-full space-y-4"
            >
                <AccordionItem value="item-4" className="rounded-lg border border-neutral-800 px-4 transition-all duration-200 hover:bg-neutral-900/50">
                    <AccordionTrigger className="hover:no-underline text-base py-4 text-left text-white">
                        What is the purpose of this project?
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-300 text-left">
                        This project streamlines Instagram outreach by allowing you to sign up, verify your account with an OTP, and access a personalized dashboard.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="rounded-lg border border-neutral-800 px-4 transition-all duration-200 hover:bg-neutral-900/50">
                    <AccordionTrigger className="hover:no-underline text-base py-4 text-white">
                        What if my OTP expires before I verify?
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-300 text-left">
                        You can request a new OTP from the login screen and proceed with verification again.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="rounded-lg border border-neutral-800 px-4 transition-all duration-200 hover:bg-neutral-900/50">
                    <AccordionTrigger className="hover:no-underline text-base py-4 text-white">
                        How do I manage multiple Instagram accounts?
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-300 text-left">
                        You can link multiple accounts under the same login, then switch between them in your dashboard.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7" className="rounded-lg border border-neutral-800 px-4 transition-all duration-200 hover:bg-neutral-900/50">
                    <AccordionTrigger className="hover:no-underline text-base py-4 text-white">
                        Can I customize the outreach messages?
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-300 text-left">
                        Yes, you can personalize messages in the dashboard settings before sending them.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8" className="rounded-lg border border-neutral-800 px-4 transition-all duration-200 hover:bg-neutral-900/50">
                    <AccordionTrigger className="hover:no-underline text-base py-4 text-white">
                        Where can I see my subscription details?
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-300 text-left">
                        Your subscription plan and billing details are listed in your account settings page.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9" className="rounded-lg border border-neutral-800 px-4 transition-all duration-200 hover:bg-neutral-900/50">
                    <AccordionTrigger className="hover:no-underline text-base py-4 text-white">
                        Is my data safe?
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-300 text-left">
                        We store your data securely, and any connection to Instagram is handled via encrypted channels.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}