module CalloutsHelper
  def info_callout(text = nil, &block)
    content_tag :div, fa_icon('info-circle', text: text || capture(&block)), class: 'info callout'
  end

  def alert_callout(text = nil, &block)
    content_tag :div, fa_icon('times-circle', text: text || capture(&block)), class: 'alert callout'
  end

  def warning_callout(text = nil, &block)
    content_tag :div, fa_icon('warning', text: text || capture(&block)), class: 'warning callout'
  end

  def success_callout(text = nil, &block)
    content_tag :div, fa_icon('check', text: text || capture(&block)), class: 'success callout'
  end

  def secondary_callout(text = nil, &block)
    content_tag :div, text || capture(&block), class: 'secondary callout'
  end
end
