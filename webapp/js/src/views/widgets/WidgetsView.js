/*globals define*/
'use strict';

define(
  [
    'jquery', 'lodash', 'backbone', 
    'text!src/views/widgets/accessibility-bar.html',
    'text!src/views/widgets/bread-crumb.html',
    'text!src/views/widgets/main-menu.html',
    'text!src/views/widgets/messages.html',
    'text!src/views/widgets/nav-bar.html',
    'text!src/views/widgets/tabs-bar.html'
  ],
  function( $, _, Backbone, 
    accessibilityBarTemplate,
    breadCrumbTemplate,
    mainMenuTemplate,
    messagesTemplate,
    navBarTemplate,
    tabsBarTemplate
    ) {

// helper function to create simple views
var simpleView = function(htmlTemplate) {
  var View = Backbone.View.extend({
    render: function() {
      this.$el.html(this.template());
      return this;
    },
    template: _.template(htmlTemplate)
  });
  return new View;
}

var widgets = {
  AccessibilityBar: accessibilityBarTemplate,
  BreadCrumb:       breadCrumbTemplate,
  MainMenu:         mainMenuTemplate,
  Messages:         messagesTemplate,
  NavBar:           navBarTemplate,
  TabsBar:          tabsBarTemplate
};

var WidgetsView = Backbone.View.extend({

  // this.el should be like 
  // {
  //   AccessibilityBar: '#accesibility-bar',
  //   BreadCrumb:       '#breadcrubm-container'
  // }
  el: {},

  render: function() {
    var currentTemplate, currentView;

    for (var key in this.el) {
      currentTemplate = widgets[key];
      if (currentTemplate) {
        currentView = simpleView(currentTemplate);
        currentView.setElement(this.el[key]);
        currentView.render();
      }
    }
    return this;
  }

});

  return WidgetsView;
});