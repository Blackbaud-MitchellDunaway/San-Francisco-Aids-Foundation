FTP Password
	Username: sfaf
	Password: hcorrewe#

current questions

1. which form is it that I will be augmenting?
	SOW says 'SFAF General Donation Form'
	there are two possible forms:
		df_id=4960
			wrapper = SFAF.org 2010-design REPONSIVE no DONATE in navbar
		pagename=donate2010 (df_id=4280 or df_id=3821)
			wrapper = SFAF.org 2010-design-no-right-column-GET-INVLOVED-section
	My best guess is that the form is df_id=4960
		Is this form using the API? (Doesn't look like it)
		Is this form using Luminate Extend?
2. what are the online goals?
3. when do I ask for the language
4. what will be the differences between a normal form and a TR form?
5. How much is the processing fee? How is it calculated?
6. How will the option be presented?
7. What will be presented to the user once the option is accepted?
8. will any design work need to be done? If so, am I doing it?

unique challenges

1. It looks like as of now, the general donation form is not using the API like it says in the SOW

opportunities

1. add better responsive behavior to wrapper 2841 2010 no donate in nav bar

scope

1. add implement functionality to API donation form that allows donors to cover processing fee 
2. make that code reusable (this may be out of scope depending on how hard it is)
3. add a flag to the cons record indicating extra donation
4. use that flag to acknowledge a donor on the payment confirmation page or email autoresponder

IP deliverables

1. IP - Basically it should serve as documentation for what was done and a roadmap for how to do it again for another project.
	a. cover both general donation and API donation
	a. method for implementation
	b. how the form works
	c. what it does
	d. what it requires
	e. what it expects
	f. what options it has
	g. everything that has been requested
	h. all the things that were not possible
	i. all the things that are out of scope
	i. all the methods that are going to be used
	j. screenshots of everything at every breakpoint
	k. QA testing procedures
		i. Client gets 1 round of revisions (for each form)
2. testing results of scope items 3 and 4
