# Publication Date Block
This plugin was created to demonstrate a possible approach to block development for WordPress. It's crafted not for use in production, but rather as a distillation of my recent work in this realm. That's right, it's a code sample! I want to demonstrate thought process and spur some questions from you leading to exciting conversations that will result in my employment. Welcome!

Let's get to it. This little block of questionable utility stems from a client request made before the post date block existed. (It was introduced into core with version 5.9 and full-site editing.) In the right context, it might still have its uses. Regardless, it makes for a tidy little package to demonstrate an approach to block development.

## Usage
Drop this block into a post via your preferred method and, voila, there's the post date. There are some minor adjustments to be had in the sidebar to control display: the site's default date setting; a handful of other common format choices; arbitrary text to prepend; and a toggle to add/remove the post's modified date. Unlike core's post date block, this block does not allow you to adjust the underlying post date.

## Technical Notes
* Static vs. dynamic. To serialize or not to serialize, that is the question! In an example like this, there's really no right or wrong approach, it depends on the larger context. I chose dynamic since it's a little more involved and makes for nice blend of PHP and JS in single example. Beyond that, I would examine the patterns already in place in an existing codebase and consider goals and use-cases (e.g. client needs, a general release, how the front end works) to guide the decision.
* Registered postmeta. Instead of block attributes, I captured the necessary context for the block's function in postmeta added to the REST representation of the post. With the block being dynamic, we've already departed from the pattern of the block's total containment within the post content, so we're already looking at external dependencies. The payoff comes in the forma of a single source of truth (the REST API) available to a variety of known and still to come clients. The block's edit function, its render callback, and, let's say an iOS app hitting the WP API for post data to display, all refer to and use the same postmeta to determine the final output.