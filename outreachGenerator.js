"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOutreachDraft = generateOutreachDraft;
function generateOutreachDraft(lead, channel = 'email', tone = 'direct_value', userConfig) {
    const senderName = userConfig?.senderName || 'Alex';
    const senderTitle = userConfig?.senderCompanyOrTitle || 'Growth & CRO Specialist';
    const primaryPain = lead.painPoints[0] || {
        title: 'Conversion Bottleneck',
        opportunity: 'increase qualified pipeline conversions'
    };
    const primaryService = lead.services.canDeliver[0] || {
        title: 'Growth & Optimization Review'
    };
    let subject = '';
    let body = '';
    let hookAngle = '';
    switch (channel) {
        case 'email':
            hookAngle = `Identified friction in ${primaryPain.title}`;
            if (tone === 'direct_value') {
                subject = `Quick observation regarding ${lead.companyName}'s ${lead.industry === 'E-commerce' ? 'mobile checkout' : 'client onboarding'}`;
                body = `Hi ${lead.companyName} Team,

I came across ${lead.companyName} while researching leading brands in the ${lead.industry} space today.

I noticed a specific growth opportunity on your site: ${primaryPain.description}

We recently implemented a similar solution for another ${lead.industry} company that resulted in a measurable lift in qualified conversions by focusing on: ${primaryPain.opportunity}.

I put together 3 specific, actionable recommendations you can implement right away. Would you be open to a 5-minute review of them sometime this week?

Best regards,
${senderName}
${senderTitle}`;
            }
            else if (tone === 'quick_question') {
                subject = `Question about ${lead.companyName}'s ${primaryPain.title.toLowerCase()}?`;
                body = `Hi ${lead.companyName} Team,

Quick question — who currently oversees conversion optimization and digital experience for ${lead.companyName}?

I spotted a slight bottleneck in ${primaryPain.title.toLowerCase()} that might be costing you potential customers each week. 

Happy to send over a 2-minute Loom breakdown free of charge if you're the right person to look at it.

Cheers,
${senderName}`;
            }
            else if (tone === 'consultative') {
                subject = `Ideas to accelerate ${lead.companyName}'s ${lead.industry} pipeline`;
                body = `Hi ${lead.companyName} Leadership,

Congratulations on the momentum with ${lead.companyName}. 

Looking closely at your current digital presence, there's significant headroom around ${primaryPain.title.toLowerCase()}. Specifically, ${primaryPain.opportunity}.

Given our work delivering ${primaryService.title}, I've mapped out a quick blueprint that addresses this without disrupting your current roadmap.

Are you available for a brief introductory conversation this Thursday afternoon?

Warm regards,
${senderName}
${senderTitle}`;
            }
            else {
                // Casual / authoritative fallback
                subject = `Growth ideas for ${lead.companyName}`;
                body = `Hey team,

Big fan of what you're building at ${lead.companyName}.

I was checking out your site and noticed an easy win: ${primaryPain.opportunity}.

We specialize in ${primaryService.title} and thought this quick observation might help your team hit your targets faster this quarter.

No pressure at all — let me know if you'd like the teardown notes!

Best,
${senderName}`;
            }
            break;
        case 'linkedin_connect':
            hookAngle = `LinkedIn connection tailored to ${lead.industry} growth`;
            subject = undefined;
            body = `Hi ${lead.companyName} team — noticed your great work in ${lead.industry}. Spotted an interesting optimization around ${primaryPain.title.toLowerCase()} on your site and thought to connect and share notes!`;
            break;
        case 'linkedin_inmail':
            hookAngle = `Consultative LinkedIn direct pitch`;
            subject = `Observation on ${lead.companyName}'s digital flow`;
            body = `Hi there,

Hope you're having a productive week.

I was analyzing ${lead.companyName}'s digital touchpoints today and couldn't help but notice: ${primaryPain.description}

We help ${lead.industry} leaders solve this through ${primaryService.title}. 

Would you be open to seeing a quick 3-bullet breakdown of how we'd address this for ${lead.companyName}?

Best,
${senderName}`;
            break;
        case 'cold_dm':
            hookAngle = `Conversational social DM`;
            subject = undefined;
            body = `Hey! Just went through ${lead.companyName} — love the brand aesthetic. Noticed one quick thing on your site though: ${primaryPain.description}
Would love to send over a free 2-minute video showing how to fix it if helpful!`;
            break;
        case 'audit_report':
            hookAngle = `Executive 3-point teardown`;
            subject = `Complimentary Teardown & Growth Roadmap for ${lead.companyName}`;
            body = `EXECUTIVE GROWTH TEARDOWN FOR ${lead.companyName.toUpperCase()}
Industry: ${lead.industry} | Generated by ClientRadar AI

1. PRIORITY BOTTLENECK DETECTED:
- Issue: ${primaryPain.title}
- Impact: ${primaryPain.description}
- Evidence: ${primaryPain.evidenceSnippet}

2. RECOMMENDED VALUE-ADD INTERVENTION:
- Service: ${primaryService.title}
- Solution: ${primaryPain.opportunity}

3. SUGGESTED ACTION PLAN:
- Step 1: Remove friction points in current user flow
- Step 2: Implement dedicated high-converting touchpoint
- Step 3: Track conversion velocity and customer retention

Prepared with care by ${senderName} (${senderTitle}).`;
            break;
    }
    return {
        id: `draft_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        leadId: lead.id,
        channel,
        tone,
        subject,
        body,
        hookAngle,
        createdAt: new Date().toISOString()
    };
}
