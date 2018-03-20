$(function() {
    $(document).on('submit', '.comment-form', function(e) {
        e.preventDefault();
        var $form = $(this);
        var data = $form.serialize();
        $.ajax({
            method: 'POST',
            url: data.action,
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function(data) {
                console.log('success', data);
                // Clear out the text box
                $form.find('textarea[name="fields[comment]"]').val('');
                // Add the new comment html
                var $comment_html = $(data.html).find('.comment-single');
                // Are we replying to a comment, or on the top-level? Determines where to append
                if (data.comment.parentId) {
                    var $replies_container = $('#comment-' + data.comment.parentId + ' .comments-list');
                    // Hide the reply form
                    $form.hide();
                    // Check for existing container for other replies
                    if ($replies_container.length == 0) {
                        $('#comment-' + data.comment.parentId).append('<ul class="comments-list"/>');
                    }
                    $('#comment-' + data.comment.parentId + ' .comments-list').append($comment_html);
                } else {
                    $('.comments-list:first').append($comment_html);
                }
            })
            .error(function(data) {
                console.log('error', data);
            });
    });
    // Toggle to show/hide replies
    $(document).on('click', 'a.comment-toggle', function(e) {
        e.preventDefault();
        $(this).parents('.comment-single:first').find('.comments-list:first').toggle();
    });
    // Toggle to show/hide reply form
    $(document).on('click', 'a.comment-reply', function(e) {
        e.preventDefault();
        $(this).parents('.comment-single:first').find('.comment-form:first').toggle();
    });
    // Handle voting
    $(document).on('click', 'a.comment-vote-down, a.comment-vote-up', function(e) {
        e.preventDefault();
        $.ajax({
            url: $(this).attr('href'),
        })
            .success(function(data) {
                console.log('success', data);
                // update label
                if (data.success) {
                    $(e.target).parent().parent().find('.count').html(data.votes + ' votes');
                }
            })
            .error(function(data) {
                console.log('error', data);
            });
    });
    // Handle flagging
    $(document).on('click', 'a.comment-flag', function(e) {
        e.preventDefault();
        $.ajax({
            url: $(this).attr('href'),
        })
            .success(function(data) {
                console.log('success', data);
                // update label
                $(e.target).parent().parent().find('.comment-flag').replaceWith('<span class="static-label comment-flag"><span class="glyphicon glyphicon-flag"></span>Flagged as inappropriate</span>');
            })
            .error(function(data) {
                console.log('error', data);
            });
    });
    // Handle deleting
    $(document).on('click', 'a.comment-delete', function(e) {
        e.preventDefault();
        $.ajax({
            url: $(this).attr('href'),
        })
            .success(function(data) {
                console.log('success', data);
            })
            .error(function(data) {
                console.log('error', data);
            });
    });
    // Handle editing
    $(document).on('click', 'a.comment-edit', function(e) {
        e.preventDefault();
        // Simply hides text and shows form
        $(this).parents('.comment-text').find('.comment-content').hide();
        $(this).parents('.comment-text').find('.edit-comment-form').show();
    });
    $(document).on('submit', '.edit-comment-form', function(e) {
        e.preventDefault();
        var data = $(this).serialize();
        var $self = $(this);
        $.ajax({
            method: 'POST',
            url: data.action,
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function(data) {
                console.log('success', data);
                // Update the comment text
                var comment_text = $self.find('textarea[name="fields[comment]"]').val().replace(/\n/g, '<br />');
                $self.parents('.comment-text').find('.comment-content').html('<p>'+comment_text+'</p>');
                // Hide/show form and content
                $self.parents('.comment-text').find('.comment-content').show();
                $self.parents('.comment-text').find('.edit-comment-form').hide();
            })
            .error(function(data) {
                console.log('error', data);
            });
    });
})