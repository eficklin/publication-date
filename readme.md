(The word salad that follows is a work in progress. The gist of what I want to cover is here and plenty to discuss as is. If you're here before I've polished it a bit, Welcome!)

# Publication Date Block
This little block of questionable utility stems from a client request made before the post date block was introduced into core with version 5.9 and full-site editing. In the right context, it might still have its uses. Regardless, it makes for a tidy little package to demonstrate an approach to block development.

This is a code sample for the sake of discussion and demonstration of basic principles (i.e. get me some employment). The block works, but use in production at your own risk.

## Usage
Drop this block into a post via your preferred method and, voila, there's the post date. There are some minor adjustments to be had in the sidebar to control display: the site's default date setting; a handful of other common format choices; arbitrary text to prepend; toggle to add the modified date. Unlike core's post date block, this block does not allow you to adjust the underlying post date.

## Technical Discussion
static vs. dynamic: to serialize or not to serialize, that is the question! in an example like this, there's really no right or wrong approach; chose dynamic since it's a little more involved and makes for nice blend of PHP and JS in single example; beyond that, it's all about the context of the larger project or your target users and use cases for a general release

registered postmeta instead of block attributes and single sources of truth to support a variety of known and still to come clients

want a snippet approach to the editorial experience; a basic UI unit that is smaller than a block; something akin to the old shortcodes, but less "code" to them so they make more sense to more people than us code monkeys; really, what the client really could have used, along with lots of other editorial teams, I imagine, is an editorial ui for dynamic snippets or tags that you can drop into any block of text; things like publication date, revision number, or a host of other arbitrary bits of data that are usually important to display and a total pain the ass to track and update; the CMS should be able to do that for you. if someone's already working on it, let me know. "Well, why not build it?," you ask. Sure thing, hire me and let's get to it.