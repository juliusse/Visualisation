import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ComponentEvent;
import java.awt.event.ComponentListener;
import java.io.File;

import javax.swing.BorderFactory;
import javax.swing.Box;
import javax.swing.BoxLayout;
import javax.swing.JComboBox;
import javax.swing.JComponent;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JToolBar;

import prefuse.Constants;
import prefuse.Display;
import prefuse.Visualization;
import prefuse.action.ActionList;
import prefuse.action.RepaintAction;
import prefuse.action.assignment.DataColorAction;
import prefuse.action.assignment.DataShapeAction;
import prefuse.action.layout.AxisLayout;
import prefuse.controls.ToolTipControl;
import prefuse.data.Table;
import prefuse.data.io.DataIOException;
import prefuse.render.DefaultRendererFactory;
import prefuse.render.ShapeRenderer;
import prefuse.util.ColorLib;
import prefuse.visual.VisualItem;
import prefuse.visual.expression.VisiblePredicate;

@SuppressWarnings("serial")
public class App extends Display {
    private final ShapeRenderer m_shapeR = new ShapeRenderer(15);

    private final Table table;
    private final String group = "table";
    private final String[] columns;
    private static JFrame frame;

    /**
     * taken from prefuse demo and improved / adjusted
     * @throws DataIOException
     */
    public App() throws DataIOException {
        super(new Visualization());

        final File file = selectFile();

        // read file
        table = new prefuse.data.io.DelimitedTextTableReader().readTable(file);

        // get column names
        columns = new String[table.getColumnCount()];
        for (int i = 0; i < table.getColumnCount(); i++) {
            columns[i] = table.getColumnName(i);
        }

        // --------------------------------------------------------------------
        // STEP 1: setup the visualized data

        m_vis.addTable(group, table);

        m_vis.setRendererFactory(new DefaultRendererFactory(m_shapeR));

        // --------------------------------------------------------------------
        // STEP 2: create actions to process the visual data

        // set up the actions
        AxisLayout x_axis = new AxisLayout(group, columns[0], Constants.X_AXIS, VisiblePredicate.TRUE);
        m_vis.putAction("x", x_axis);

        AxisLayout y_axis = new AxisLayout(group, columns[1], Constants.Y_AXIS, VisiblePredicate.TRUE);
        m_vis.putAction("y", y_axis);

        // ColorAction color = new ColorAction(group,
        // VisualItem.STROKECOLOR, ColorLib.rgb(100,100,255));
        // m_vis.putAction("colorStroke", color);

        DataColorAction fill = new DataColorAction(group, columns[3], Constants.NOMINAL, VisualItem.STROKECOLOR, ColorLib.getCoolPalette());
        m_vis.putAction("color", fill);

        DataShapeAction shape = new DataShapeAction(group, columns[2]);
        m_vis.putAction("shape", shape);

        ActionList draw = new ActionList();
        draw.add(x_axis);
        draw.add(y_axis);
        draw.add(shape);
        draw.add(fill);
        // draw.add(color);
        draw.add(new RepaintAction());
        m_vis.putAction("draw", draw);

        // --------------------------------------------------------------------
        // STEP 3: set up a display and ui components to show the visualization

        setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        setSize(700, 450);
        setHighQuality(true);

        ToolTipControl ttc = new ToolTipControl(columns);
        addControlListener(ttc);

        frame.add(generateEncodingToolbar(columns[0], columns[1], columns[2], columns[3]), BorderLayout.NORTH);

        // --------------------------------------------------------------------
        // STEP 4: launching the visualization

        m_vis.run("draw");

        addComponentListener(new ComponentListener() {

            @Override
            public void componentShown(ComponentEvent arg0) {

            }

            @Override
            public void componentResized(ComponentEvent arg0) {
                m_vis.run("draw");
            }

            @Override
            public void componentMoved(ComponentEvent arg0) {

            }

            @Override
            public void componentHidden(ComponentEvent arg0) {

            }
        });
    }

    private static File selectFile() {
        final JFileChooser fileChooser = new JFileChooser();
        fileChooser.setCurrentDirectory(new File(System.getProperty("user.dir")));
        fileChooser.showOpenDialog(frame);
        // get selected file
        final File file = fileChooser.getSelectedFile();
        if (file == null) {
            System.exit(0);
            return null;
        } else
            return file;
    }

    private static void createAndShowGUI() throws Exception {
        // create and setup the window
        frame = new JFrame("Prefuse Demo");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        JComponent newContentPane = new App();
        newContentPane.setOpaque(true); // content panes must be opaque
        frame.add(newContentPane, BorderLayout.CENTER);

        // display the window.
        frame.pack();
        Toolkit toolkit = Toolkit.getDefaultToolkit();
        Dimension screenSize = toolkit.getScreenSize();
        frame.setLocation((screenSize.width - frame.getWidth()) / 2, (screenSize.height - frame.getHeight()) / 2);
        frame.setVisible(true);
    }

    /**
     * taken from prefuse demo and improved
     */
    private JToolBar generateEncodingToolbar(final String xfield, final String yfield, final String sfield, final String cField) {
        final int spacing = 10;

        // create toolbar that allows visual mappings to be changed
        JToolBar toolbar = new JToolBar();
        toolbar.setLayout(new BoxLayout(toolbar, BoxLayout.X_AXIS));
        toolbar.add(Box.createHorizontalStrut(spacing));

        final JComboBox<String> xcb = new JComboBox<String>(columns);
        xcb.setSelectedItem(xfield);
        xcb.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                Visualization vis = getVisualization();
                AxisLayout xaxis = (AxisLayout) vis.getAction("x");
                xaxis.setDataField((String) xcb.getSelectedItem());
                vis.run("draw");
            }
        });
        toolbar.add(new JLabel("X: "));
        toolbar.add(xcb);
        toolbar.add(Box.createHorizontalStrut(2 * spacing));

        final JComboBox<String> ycb = new JComboBox<String>(columns);
        ycb.setSelectedItem(yfield);
        ycb.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                Visualization vis = getVisualization();
                AxisLayout yaxis = (AxisLayout) vis.getAction("y");
                yaxis.setDataField((String) ycb.getSelectedItem());
                vis.run("draw");
            }
        });
        toolbar.add(new JLabel("Y: "));
        toolbar.add(ycb);
        toolbar.add(Box.createHorizontalStrut(2 * spacing));

        final JComboBox<String> scb = new JComboBox<String>(columns);
        scb.setSelectedItem(sfield);
        scb.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                Visualization vis = getVisualization();
                DataShapeAction s = (DataShapeAction) vis.getAction("shape");
                s.setDataField((String) scb.getSelectedItem());
                vis.run("draw");
            }
        });
        toolbar.add(new JLabel("Shape: "));
        toolbar.add(scb);
        toolbar.add(Box.createHorizontalStrut(spacing));

        final JComboBox<String> ccb = new JComboBox<String>(columns);
        ccb.setSelectedItem(cField);
        ccb.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                Visualization vis = getVisualization();
                DataColorAction dataColorAction = (DataColorAction) vis.getAction("color");
                dataColorAction.setDataField((String) ccb.getSelectedItem());
                vis.run("draw");
            }
        });
        toolbar.add(new JLabel("Color: "));
        toolbar.add(ccb);
        toolbar.add(Box.createHorizontalStrut(2 * spacing));
        toolbar.add(Box.createHorizontalGlue());

        return toolbar;
    }

    /**
     * @param args
     */
    public static void main(String[] args) throws Exception {
        createAndShowGUI();
    }

}
